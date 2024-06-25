#!/usr/bin/env node

// Glob is a package that allows you to use wildcards to find files and directories
const glob = require('glob'); 

// fs-extra is a package that extends the Node.js file system module with additional features
const fs = require('fs-extra'); 

// Path is a Node.js core module that provides utilities for working with file and directory paths
const path = require('path'); 

// Function to collect all used image paths in the project
const collectUsedImages = () => {

  const usedImages = new Set(); // Set is a collection of unique values

  // Use glob to find all JavaScript and JSX files
  const files = glob.sync('src/**/*.{js,jsx}', { nodir: true });

  // Loop through each file
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    // Regex to match import statements for images
    const importRegex = /import\s+\w+\s+from\s+['"](\.\.\/[^'"]+\.(?:png|jpe?g|gif|svg))['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const resolvedPath = path.resolve(path.dirname(file), match[1]);
      
      const relativePath = path.relative(path.join(__dirname, '..', 'src'), resolvedPath).replace(/\\/g, '/');
      usedImages.add(relativePath);
    }
  });

  return usedImages;
};

// Function to collect all image files in the project
const collect_images_src_images = () => {
  const images = glob.sync('src/images/**/*.{png,jpg,jpeg,gif,svg}', { nodir: true });
  const relativeImages = images.map(image => path.relative(path.join(__dirname, '..', 'src'), image).replace(/\\/g, '/'));
  // relativeImages.forEach(image => console.log(`All image path: ${image}`));
  return new Set(relativeImages);
};

const collect_images_src_assets = () => {
  const images = glob.sync('src/assets/**/*.{png,jpg,jpeg,gif,svg}', { nodir: true });
  const relativeImages = images.map(image => path.relative(path.join(__dirname, '..', 'src'), image).replace(/\\/g, '/'));
  // relativeImages.forEach(image => console.log(`All image path: ${image}`));
  return new Set(relativeImages);
}

const collect_images_root_assets = () => {
  const images = glob.sync('assets/**/*.{png,jpg,jpeg,gif,svg}', { nodir: true });
  const relativeImages = images.map(image => path.relative(path.join(__dirname, '..'), image).replace(/\\/g, '/'));
  // relativeImages.forEach(image => console.log(`All image path: ${image}`));
  return new Set(relativeImages);
}

const collect_images_root_images = () => {
  const images = glob.sync('images/**/*.{png,jpg,jpeg,gif,svg}', { nodir: true });
  const relativeImages = images.map(image => path.relative(path.join(__dirname, '..'), image).replace(/\\/g, '/'));
  // relativeImages.forEach(image => console.log(`All image path: ${image}`));
  return new Set(relativeImages);
}


// const collect_images = () => {
//   const images = glob.sync('**/*.{png,jpg,jpeg,gif,svg}', { nodir: true , ignore: ['node_modules/**/*', 'build/**/*', 'public/**/*']});
//   const relativeImages = images.map(image => path.relative(path.join(__dirname, '..'), image).replace(/\\/g, '/'));
//   // relativeImages.forEach(image => console.log(`All image path: ${image}`));
//   return new Set(relativeImages);
// }


// Main function to find unused images
const findUnusedImages = () => {
  const src_images = collect_images_src_images();
  const src_assets = collect_images_src_assets();
  
  const root_images = collect_images_root_images();
  const root_assets = collect_images_root_assets();

  const usedImages = collectUsedImages();
  
  // const images = collect_images();

  const allImages = new Set([...src_images, ...src_assets, ...root_images, ...root_assets]);

  const unusedImages = [...allImages].filter(image => !usedImages.has(image));

  if (unusedImages.length === 0) {
    console.log('\nNo unused images found!\n');
    console.log(`Total all images: ${allImages.size}`);
    if(src_images.size > 0) console.log(`Total images in ./src/images: ${src_images.size}`);
    if(src_assets.size > 0) console.log(`Total images in ./src/assets: ${src_assets.size}`);
    if(root_images.size > 0) console.log(`Total images in ./images: ${root_images.size}`);
    if(root_assets.size > 0) console.log(`Total images in ./assets: ${root_assets.size}`);

  } else {
    console.log('\nUnused images found!\n');
    console.log(`\nTotal images: ${allImages.size}`);
    if(src_images.size > 0) console.log(`Total images in ./src/images: ${src_images.size}`);
    if(src_assets.size > 0) console.log(`Total images in ./src/assets: ${src_assets.size}`);
    if(root_images.size > 0) console.log(`Total images in ./images: ${root_images.size}`);
    if(root_assets.size > 0) console.log(`Total images in ./assets: ${root_assets.size}`);
    console.log(`Total unused images: ${unusedImages.length}`);
    console.log('\nUnused images:');
    unusedImages.forEach(image => console.log(image));

  }
};

findUnusedImages();
