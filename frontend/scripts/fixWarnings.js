const fs = require('fs');
const path = require('path');

// Fix 1: Remove unused inputColor imports
const removeUnusedInputColor = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Check if inputColor is imported but not used in the code
  const hasInputColorImport = /import.*\binputColor\b/.test(content);
  const usesInputColor = /[^']inputColor[^']/.test(content.replace(/import.*inputColor.*/, ''));

  if (hasInputColorImport && !usesInputColor) {
    // Remove inputColor from imports
    content = content.replace(/,\s*inputColor\b/g, '');
    content = content.replace(/\binputColor\b,\s*/g, '');
    // If inputColor was the only import, remove the whole line
    content = content.replace(/^import\s*\{\s*\}\s*from.*colors.*;\s*\n/gm, '');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
  }
  return false;
};

// Fix 2: Remove unused variables
const removeUnusedVariables = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Remove unused buttonRefs
  if (content.includes("'buttonRefs' is assigned a value but never used")) {
    content = content.replace(/const\s+buttonRefs\s*=\s*useRef.*;\s*\n/g, '');
  }

  // Remove unused isMagnifier
  if (content.includes("'isMagnifier' is assigned a value but never used")) {
    content = content.replace(/const\s+\[isMagnifier,\s*setIsMagnifier\]\s*=\s*useState.*;\s*\n/g, '');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
};

// Fix 3: Fix invalid ARIA role
const fixAriaRole = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Fix invalid ARIA roles
  content = content.replace(/role="content"/g, 'role="region"');
  content = content.replace(/role="section"/g, 'role="region"');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
};

// Process all files
const processDirectory = (dir, stats = { inputColor: 0, variables: 0, aria: 0 }) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'build') {
        continue;
      }
      processDirectory(fullPath, stats);
    } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
      if (removeUnusedInputColor(fullPath)) {
        stats.inputColor++;
        console.log(`✓ Removed unused inputColor: ${fullPath}`);
      }
      if (removeUnusedVariables(fullPath)) {
        stats.variables++;
        console.log(`✓ Removed unused variable: ${fullPath}`);
      }
      if (fixAriaRole(fullPath)) {
        stats.aria++;
        console.log(`✓ Fixed ARIA role: ${fullPath}`);
      }
    }
  }

  return stats;
};

// Main execution
console.log('🔧 Fixing warnings...\n');

const srcDir = path.join(__dirname, '..', 'src');
const stats = processDirectory(srcDir);

console.log('\n✨ Warning fixes complete!');
console.log(`📊 Files fixed:`);
console.log(`  - Removed unused inputColor: ${stats.inputColor} files`);
console.log(`  - Removed unused variables: ${stats.variables} files`);
console.log(`  - Fixed ARIA roles: ${stats.aria} files`);
