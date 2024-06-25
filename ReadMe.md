# Image Management Script Documentation

This documentation provides an overview of the Node.js script used to manage image files within a project. The script identifies unused image files across the project by checking image imports in JavaScript and JSX files.

# Usage
## Installation 
Install the package globally using npm:

```
    $ npm i -g react-unused-image-finder
```
To run the script, execute:
```
    $ find-unused-images
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

Searches through all `.js` and `.jsx` files within the `src` directory to find image imports. It uses regular expressions to identify import statements and collects the relative paths of these images. Paths are adjusted to be relative to the project's `src` directory.

### Directory-Specific Collection Functions

- **collect_images_src_images**
- **collect_images_src_assets**
- **collect_images_root_assets**
- **collect_images_root_images**

Each of these functions targets a specific directory (`src/images`, `src/assets`, etc.) and collects all image files of types `png`, `jpg`, `jpeg`, `gif`, and `svg`. The paths are normalized and made relative to the project root.

### findUnusedImages

Combines the sets of images collected from different directories and compares them to the set of used images. It identifies any images not referenced in any `.js` or `.jsx` file and logs these as unused, providing a summary of the total images and the unused images.

## Usage

To use this script:

1. Ensure all dependencies are installed via NPM or Yarn.
2. Place the script at the root of your Node.js project.
3. Run the script using Node (`node <script-name.js>`).

This will execute the `findUnusedImages` function, which outputs the results directly to the console.

## Potential Enhancements

- **Automation**: Integrate this script into build processes or CI pipelines to regularly check for unused assets.
- **Extended File Type Support**: Modify regex and glob patterns to include other types of assets.
- **Error Handling**: Add robust error handling to manage file access permissions and missing directories.

This script is a useful tool for maintaining efficient management of assets in large projects, helping to reduce clutter and optimize application performance.
