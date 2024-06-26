# Image Management Script Documentation

This documentation provides an overview of the Node.js script used to manage image files within a React project. The script identifies unused image files across the project by checking image imports in JavaScript, JSX, TypeScript and TSX

# Usage
## Installation 
### Install the package globally using npm:

```
    $ npm i -g react-unused-image-finder
```
or 

``` 
    $ yarn global add react-unused-image-finder
```

### To ensure the package runs, run it at your project level

#### Commands available: 
```
    $ find-unused-images // This gives a summary of unused images and their relative path
```
```
    $ find-unused-images-full // This gives a full report of images found, where they are used and unused images relative paths
```
## File Structure Read Available
    Option 1:
    ┌── your-react-project
    ├──├── assets/**/*
    ├──├── src/**/*
    └── **

    Option 2:
    ┌── your-react-project
    ├──├── images/**/*
    ├──├── src/**/*
    └── **

    Option 3:
    ┌── your-react-project
    ├──├── src/**/*
    ├──├──├── images/**/*
    └── **
    
    Option 4:
    ┌── your-react-project
    ├──├── src/**/*
    ├──├──├── assets/**/*
    └── **
## Image Imports Method

```
    // This is the regex used to find imports
    const importRegex = /import\s+\w+\s+from\s+['"](\.\.\/[^'"]+\.(?:png|jpe?g|gif|svg))['"]/g;

    // How it should read in your file
    import some_image from 'file/path/to/image.{png,jpg,jpeg,gif,svg}';
```
### In Developement Method
```
    require('file/path/to/image.{png,jpg,jpeg,gif,svg}');
```

## Script Overview

The script consists of several key functions:

1. **collectUsedImages**: Scans JavaScript and JSX files for imported image files, collecting paths to these images.
2. **collect_images_src_images** and related functions: These functions collect paths to all image files stored in various project directories.
3. **findUnusedImages**: Compares collected image paths to identify unused images and logs results.

## Dependencies

- **glob**: Used to pattern-match file paths, allowing the script to find specific file types across directories.
- **fs-extra**: An extension of the Node.js native `fs` module, providing additional methods to interact with the file system.
- **path**: A core Node.js module used for handling and transforming file paths.

## Functions

### collectUsedImages

Searches through all `.js`,  `.jsx`, `.ts` and `.tsx` files within the `src` directory to find image imports. It uses regular expressions to identify import statements and collects the relative paths of these images. Paths are adjusted to be relative to the project's `src` directory.

### Directory-Specific Collection Functions

- **collect_images_src_images**
- **collect_images_src_assets**
- **collect_images_root_assets**
- **collect_images_root_images**

Each of these functions targets a specific directory (`src/images`, `src/assets`, etc.) and collects all image files of types `png`, `jpg`, `jpeg`, `gif`, and `svg`. The paths are normalized and made relative to the project root.

### findUnusedImages

Combines the sets of images collected from different directories and compares them to the set of used images. It identifies any images not referenced in any `.js`,  `.jsx`, `.ts` and `.tsx` file and logs these as unused, providing a summary of the total images and the unused images.

## Potential Enhancements
- **Gloabal Function**: Consolidate the `collect_images_**` functions to a single function
- **Move images**: Move unused images to a folder for easy removal 
- **Add Terminal Interaction**: If unused images are found allow the deletion of them through terminal prompts
- **Error Handling**: Add robust error handling to manage file access permissions and missing directories.
- **Test**: Write test for the scripts

This script is a useful tool for maintaining efficient management of assets in large projects, helping to reduce clutter and optimize application performance.
