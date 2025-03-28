#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  console.log('Creating dist directory...');
  fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
}

try {
  // Clean and build
  console.log('Cleaning and building...');
  execSync('npm run clean && npm run build', { stdio: 'inherit' });
  
  // Verify dist directory has files
  const distFiles = fs.readdirSync(path.join(__dirname, 'dist'));
  if (distFiles.length === 0) {
    throw new Error('Build completed but dist directory is empty!');
  }
  
  console.log('Build successful. Files in dist:');
  distFiles.forEach(file => console.log(` - ${file}`));
  
  // Publish
  console.log('\nPublishing package...');
  execSync('npm publish --access public', { stdio: 'inherit' });
  
  console.log('\nPackage published successfully!');
} catch (error) {
  console.error('Error during publish process:', error.message);
  process.exit(1);
}