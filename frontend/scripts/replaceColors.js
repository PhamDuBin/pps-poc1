const fs = require('fs');
const path = require('path');

// Color mappings: old hex color -> new Tailwind class
const colorMappings = {
  'bg-\\[#80bad7\\]': 'bg-label',
  'bg-\\[#ebcec0\\]': 'bg-input',
  'bg-\\[#d8dadc\\]': 'bg-bg-alt',
  'bg-\\[#EEEEEE\\]': 'bg-bg-gray',
  'bg-\\[#4770a5\\]': 'bg-button-primary',
  'border-\\[#000000\\]': 'border-black',
  'border-\\[#black\\]': 'border-black',
};

function replaceColorsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Replace each color mapping
    for (const [oldColor, newColor] of Object.entries(colorMappings)) {
      const regex = new RegExp(oldColor, 'g');
      if (regex.test(content)) {
        content = content.replace(regex, newColor);
        modified = true;
      }
    }

    // Write back if modified
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Updated: ${filePath}`);
      return 1;
    }
    return 0;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return 0;
  }
}

function processDirectory(dir, stats = { total: 0, updated: 0 }) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules and other irrelevant directories
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'build') {
        continue;
      }
      processDirectory(fullPath, stats);
    } else if (entry.isFile()) {
      // Only process TypeScript/JavaScript/JSX/TSX files
      if (/\.(tsx?|jsx?)$/.test(entry.name)) {
        stats.total++;
        stats.updated += replaceColorsInFile(fullPath);
      }
    }
  }

  return stats;
}

// Main execution
console.log('🎨 Starting color replacement...\n');

const srcDir = path.join(__dirname, '..', 'src');
const stats = processDirectory(srcDir);

console.log('\n✨ Color replacement complete!');
console.log(`📊 Total files processed: ${stats.total}`);
console.log(`✅ Files updated: ${stats.updated}`);
console.log(`⏭️  Files unchanged: ${stats.total - stats.updated}`);
