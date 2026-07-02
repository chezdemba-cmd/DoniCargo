const fs = require('fs');
const path = require('path');

const resultsPath = path.join(__dirname, 'lint-results.json');
if (!fs.existsSync(resultsPath)) {
  console.log('No lint-results.json found');
  process.exit(1);
}

const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
let fixedCount = 0;

results.forEach(result => {
  const filePath = result.filePath;
  if (!fs.existsSync(filePath)) return;

  const messages = result.messages.filter(m => m.ruleId === 'react/no-unescaped-entities');
  if (messages.length === 0) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let lines = content.split('\n');

  // Sort messages in reverse order so replacements don't mess up columns
  messages.sort((a, b) => {
    if (a.line !== b.line) return b.line - a.line;
    return b.column - a.column;
  });

  messages.forEach(msg => {
    const lineIdx = msg.line - 1;
    const colIdx = msg.column - 1;
    let line = lines[lineIdx];
    
    // The character is usually ' or "
    const charToReplace = line[colIdx];
    let replacement = charToReplace;
    if (charToReplace === "'") replacement = '&apos;';
    else if (charToReplace === '"') replacement = '&quot;';
    else if (charToReplace === '>') replacement = '&gt;';
    else replacement = '&apos;'; // default fallback for '

    lines[lineIdx] = line.slice(0, colIdx) + replacement + line.slice(colIdx + 1);
    fixedCount++;
  });

  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
});

console.log(`Fixed ${fixedCount} unescaped entities!`);
