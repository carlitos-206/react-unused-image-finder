#!/usr/bin/env node

const help = () => {
    return console.log(`
You can run 'find-unused-images' without any options to perform a default scan.

Usage: 
    find-unused-images-[options]


Options:
    -f, -full          Display a full report
    -h, -help          Display this help message
    -v, -version       Display the version information

Example:
    find-unused-images            # performs default scan /w min report
    find-unused-images-f          # performs default scan /w full report
    `);
}

help();

/*

goal: 
    const help =() => {
        console.log(`
        Usage: find-unused-images-[options]

        You can run 'find-unused-images' without any options to perform a default scan.


        Options:
            -f, -full          Display a full report
            -h, --help         Display help
            -v, --version      Display version
            -s, --silent       Silent mode
            -d, --delete       Delete unused images
            -p, --path         Path to search for images
        `);
    }

*/