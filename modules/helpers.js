const fs = require('fs');
const path = require('path');

function loadJson(filename) {
  const filePath = path.join(__dirname, filename);
  const jsonText = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonText);
}

function renderTemplate(filename, replacements) {
  const filePath = path.join(__dirname, filename);
  let template = fs.readFileSync(filePath, 'utf8');

  for (const [key, value] of Object.entries(replacements)) {
    template = template.replace(`{{${key}}}`, value);
  }

  return JSON.parse(template);
}

module.exports = {
  loadJson,
  renderTemplate
};
