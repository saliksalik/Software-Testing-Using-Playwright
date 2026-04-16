const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function sanitizeName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function writeFindingReport(testName, targetUrl, findings) {
  const outputDir = path.join(__dirname, 'output');
  ensureDir(outputDir);

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const safeTestName = sanitizeName(testName);

  const jsonPath = path.join(outputDir, `${safeTestName}.${timestamp}.json`);
  const mdPath = path.join(outputDir, `${safeTestName}.${timestamp}.md`);

  const payload = {
    generatedAt: new Date().toISOString(),
    testName,
    targetUrl,
    findings,
    findingCount: findings.length,
    severityCount: findings.reduce((acc, item) => {
      const key = item.severity || 'info';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  };

  fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2), 'utf8');

  const lines = [];
  lines.push(`# Security Report - ${testName}`);
  lines.push('');
  lines.push(`Generated At: ${payload.generatedAt}`);
  lines.push(`Target: ${targetUrl}`);
  lines.push(`Findings: ${findings.length}`);
  lines.push('');

  if (findings.length === 0) {
    lines.push('No findings in this check.');
  } else {
    lines.push('| # | OWASP | Severity | Title | Evidence | Recommendation |');
    lines.push('|---|---|---|---|---|---|');
    findings.forEach((item, index) => {
      lines.push(`| ${index + 1} | ${item.owasp || '-'} | ${item.severity || 'info'} | ${item.title} | ${item.evidence} | ${item.recommendation} |`);
    });
  }

  fs.writeFileSync(mdPath, lines.join('\n'), 'utf8');

  return { jsonPath, mdPath, payload };
}

function failOnFindingsIfConfigured(findings) {
  const gateEnabled = String(process.env.SECURITY_GATE_ENABLED || '').toLowerCase() === 'true';
  if (!gateEnabled) {
    return false;
  }

  const highOrCritical = findings.filter((item) => ['high', 'critical'].includes((item.severity || '').toLowerCase()));
  if (highOrCritical.length > 0) {
    throw new Error(`Security gate failed: ${highOrCritical.length} high/critical findings detected.`);
  }

  return true;
}

module.exports = {
  writeFindingReport,
  failOnFindingsIfConfigured
};
