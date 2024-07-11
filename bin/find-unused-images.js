#!/usr/bin/env node

// The process object is a global that provides information about, and control over, the current Node.js process
const process = require('process');
// Glob is a package that allows you to use wildcards to find files and directories
const glob = require('glob'); 

// fs-extra is a package that extends the Node.js file system module with additional features
const fs = require('fs-extra'); 

// Path is a Node.js core module that provides utilities for working with file and directory paths
const path = require('path'); 

// Function to collect all used image paths in the project
const collectUsedImages = () => {

    const usedImages = new Set(); // Set is a collection of unique values

    // Use glob to find all JavaScript, JSX, TypeScript, and TSX files in the src directory
    const files = glob.sync('src/**/*.{js,jsx,ts,tsx}', { nodir: true });    
    
    // If no files are found, log a message and return an empty Set
    if(files.length === 0) {
        throw new Error(`
        No JavaScript or TypeScript files found in ./src/**/*.{js,jsx,ts,tsx}
        Please make sure you are running this script from the root of your React project
        `);
    }
    // Loops through and reads the content of each file found by glob
    files.forEach(file => {
    
        const content = fs.readFileSync(file, 'utf-8'); // read the content of the file
        
        // Regex to match import statements for images
        const importRegex = /import\s+\w+\s+from\s+['"](\.\.\/[^'"]+\.(?:png|jpe?g|gif|svg))['"]/g;
        
        let match; // variable to store the result of the regex match
        
        
        while ((match = importRegex.exec(content)) !== null) { // loop through all matches

            const resolvedPath = path.resolve(path.dirname(file), match[1]);    // resolve the path of the image
            const relativePath = path.relative(path.join(__dirname, '..', 'src'), resolvedPath).replace(/\\/g, '/'); // get the relative path of the image
            usedImages.add(relativePath); // add the relative path to the Set
            }
    });

    return usedImages; // return the Set of used image paths
};

// Function to collect all image files in the project
const collect_images_src_images = () => {
    const images = glob.sync('src/images/**/*.{png,jpg,jpeg,gif,svg}', { nodir: true });
    if(images.length > 0){ 
        const relativeImages = images.map(image => path.relative(path.join(__dirname, '..', 'src'), image).replace(/\\/g, '/')); // get the relative path of the image
        return new Set(relativeImages);
    }else {
        // Needs to return a Set to avoid error
        return new Set();
    
    }
};

const collect_images_src_assets = () => {
    const images = glob.sync('src/assets/**/*.{png,jpg,jpeg,gif,svg}', { nodir: true });
    if(images.length>0){
        const relativeImages = images.map(image => path.relative(path.join(__dirname, '..', 'src'), image).replace(/\\/g, '/')); // get the relative path of the image
        relativeImages.forEach(image => console.log(`Image: ${image}`));
        return new Set(relativeImages);
    }else{
        // Needs to return a Set to avoid error
        return new Set();
    }
}

const collect_images_root_assets = () => {
    const images = glob.sync('assets/**/*.{png,jpg,jpeg,gif,svg}', { nodir: true });
    if(images.length>0){
        const relativeImages = images.map(image => path.relative(path.join(__dirname, '..'), image).replace(/\\/g, '/'));
        relativeImages.forEach(image => console.log(`Image in ./assets/**/*: ${image}`));
        return new Set(relativeImages);
    }else{
        // Needs to return a Set to avoid error
        return new Set();
    }
}

const collect_images_root_images = () => {
    const images = glob.sync('images/**/*.{png,jpg,jpeg,gif,svg}', { nodir: true });
    if(images.length>0) {
        const relativeImages = images.map(image => path.relative(path.join(__dirname, '..'), image).replace(/\\/g, '/'));
        relativeImages.forEach(image => console.log(`Image in ./images/**/*: ${image}`))
        return new Set(relativeImages);
    }else{
        // Needs to return a Set to avoid error
        return new Set();
    }
}

const collect_images_public = () => {
    const images = glob.sync('public/**/*.{png,jpg,jpeg,gif,svg}', { nodir: true });
    if(images.length>0) {
        const relativeImages = images.map(image => path.relative(path.join(__dirname, '..'), image).replace(/\\/g, '/'));
        relativeImages.forEach(image => console.log(`Image in ./images/**/*: ${image}`))
        return new Set(relativeImages);
    }else{
        // Needs to return a Set to avoid error
        return new Set();
    }
}

// const collect_images = () => {
//   const images = glob.sync('**/*.{png,jpg,jpeg,gif,svg}', { nodir: true , ignore: ['node_modules/**/*', 'build/**/*', 'public/**/*']});
//   const relativeImages = images.map(image => path.relative(path.join(__dirname, '..'), image).replace(/\\/g, '/'));
//   // relativeImages.forEach(image => console.log(`All image path: ${image}`));
//   return new Set(relativeImages);
// }


// Main function to find unused images
const findUnusedImages = () => {
    // Collect all used image paths in the project
    const src_images = collect_images_src_images();
    const src_assets = collect_images_src_assets();
    
    const root_images = collect_images_root_images();
    const root_assets = collect_images_root_assets();

    const public_images = collect_images_public();

    const usedImages = collectUsedImages();


    // const images = collect_images();

    const allImages = new Set([...src_images, ...src_assets, ...root_images, ...root_assets, ...public_images]);

    const unusedImages = [...allImages].filter(image => !usedImages.has(image));

    if (unusedImages.length === 0) {
        console.log('\nNo unused images found!\n');
        console.log(`Total all images: ${allImages.size}`);
        if(src_images.size > 0) console.log(`Total images in ./src/images: ${src_images.size}`);
        if(src_assets.size > 0) console.log(`Total images in ./src/assets: ${src_assets.size}`);
        if(root_images.size > 0) console.log(`Total images in ./images: ${root_images.size}`);
        if(root_assets.size > 0) console.log(`Total images in ./assets: ${root_assets.size}`);
        if(public_images.size > 0) console.log(`Total images in ./public: ${public_images.size}`);
    } else {
        console.log('\nUnused images found!\n');
        console.log(`\nTotal images: ${allImages.size}`);
        if(src_images.size > 0) console.log(`Total images in ./src/images: ${src_images.size}`);
        if(src_assets.size > 0) console.log(`Total images in ./src/assets: ${src_assets.size}`);
        if(root_images.size > 0) console.log(`Total images in ./images: ${root_images.size}`);
        if(root_assets.size > 0) console.log(`Total images in ./assets: ${root_assets.size}`);
        if(public_images.size > 0) console.log(`Total images in ./public: ${public_images.size}`);
        console.log(`Total unused images: ${unusedImages.length}`);
        console.log('\nUnused images:');
        unusedImages.forEach(image => console.log(image));
    }
};



findUnusedImages();
