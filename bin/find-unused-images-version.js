#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Path to your package.json
const packagePath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

console.log(`Version: ${packageJson.version}`);
