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

async function createJiraIssue({ baseUrl, email, apiToken, projectKey, finding, report }) {
  const url = `${baseUrl.replace(/\/$/, '')}/rest/api/3/issue`;
  const auth = Buffer.from(`${email}:${apiToken}`).toString('base64');

  const priorityName = finding.severity === 'critical' ? 'Highest'
    : finding.severity === 'high' ? 'High'
    : finding.severity === 'medium' ? 'Medium'
    : 'Low';

  const payload = {
    fields: {
      project: { key: projectKey },
      summary: `[Security][${finding.owasp || 'OWASP'}] ${finding.title}`,
      description: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: `Target: ${report.targetUrl || '-'}` }]
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: `OWASP: ${finding.owasp || '-'} | Severity: ${finding.severity || 'info'}` }]
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: `Evidence: ${finding.evidence || '-'}` }]
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: `Recommendation: ${finding.recommendation || '-'}` }]
          }
        ]
      },
      issuetype: { name: 'Bug' },
      labels: ['security', 'owasp', 'sqa'],
      priority: { name: priorityName }
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Jira issue creation failed: ${response.status} ${body}`);
  }

  return response.json();
}

async function main() {
  const baseUrl = process.env.JIRA_BASE_URL;
  const email = process.env.JIRA_EMAIL;
  const apiToken = process.env.JIRA_API_TOKEN;
  const projectKey = process.env.JIRA_PROJECT_KEY;

  if (!baseUrl || !email || !apiToken || !projectKey) {
    throw new Error('Missing Jira env vars. Required: JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN, JIRA_PROJECT_KEY');
  }

  const inputArg = process.argv[2];
  const reportDir = path.join(__dirname, '..', '..', 'test', 'module-8', 'output');
  const reportPath = inputArg || newestJsonFile(reportDir);

  if (!reportPath) {
    throw new Error('No JSON report found. Run module-8 tests first.');
  }

  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  const findings = report.findings || [];

  if (findings.length === 0) {
    console.log('No findings in report. No Jira issues created.');
    return;
  }

  let created = 0;
  for (const finding of findings) {
    const issue = await createJiraIssue({
      baseUrl,
      email,
      apiToken,
      projectKey,
      finding,
      report
    });

    created += 1;
    console.log(`Created Jira issue: ${issue.key}`);
  }

  console.log(`Total Jira issues created: ${created}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
