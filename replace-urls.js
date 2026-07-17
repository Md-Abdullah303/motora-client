const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
};

const files = walk('./app');
files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const originalContent = content;
  content = content.replace(/(["'`])http:\/\/localhost:4000(.*?)\1/g, "\\`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}$2\\`");

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
});
