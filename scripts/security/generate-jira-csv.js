const fs = require('fs');
const path = require('path');

function newestJsonFile(dir) {
  const files = fs.readdirSync(dir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => ({
      name,
      fullPath: path.join(dir, name),
      mtime: fs.statSync(path.join(dir, name)).mtimeMs
    }))
    .sort((a, b) => b.mtime - a.mtime);

  return files.length > 0 ? files[0].fullPath : null;
}

function csvEscape(value) {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
}

function main() {
  const inputArg = process.argv[2];
  const outputArg = process.argv[3];

  const defaultInputDir = path.join(__dirname, '..', '..', 'modules', 'Module 8 - Security Checks', 'output');
  const inputPath = inputArg || newestJsonFile(defaultInputDir);

  if (!inputPath) {
    throw new Error('No JSON report found. Run module-8 tests first.');
  }

  const report = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const findings = report.findings || [];

  const outputPath = outputArg || path.join(defaultInputDir, 'jira-import.csv');

  const rows = [];
  rows.push([
    'Summary',
    'Issue Type',
    'Description',
    'Priority',
    'Labels'
  ].map(csvEscape).join(','));

  findings.forEach((item) => {
    const priority = item.severity === 'critical' ? 'Highest'
      : item.severity === 'high' ? 'High'
      : item.severity === 'medium' ? 'Medium'
      : 'Low';

    const summary = `[Security][${item.owasp || 'OWASP'}] ${item.title}`;
    const description = [
      `Target: ${report.targetUrl || '-'}`,
      `OWASP: ${item.owasp || '-'}`,
      `Severity: ${item.severity || 'info'}`,
      `Evidence: ${item.evidence || '-'}`,
      `Recommendation: ${item.recommendation || '-'}`,
      `GeneratedAt: ${report.generatedAt || '-'}`
    ].join('\\n');

    rows.push([
      summary,
      'Bug',
      description,
      priority,
      'security,owasp,sqa'
    ].map(csvEscape).join(','));
  });

  fs.writeFileSync(outputPath, rows.join('\n'), 'utf8');
  console.log(`Jira CSV created: ${outputPath}`);
  console.log(`Issues prepared: ${findings.length}`);
}

main();
