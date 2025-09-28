// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 
// Try to do an expensive operation below the file read and see how it affects the output. 
// Make the expensive operation more and more expensive and see how it affects the output. 

const { error } = require('console');
const fs = require('fs');

fs.readFile('example.txt', 'utf-8', (err, data) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.error('Error: File not found!');
        } else {
            console.error('Error reading file: ', err);
        }
        return;
    }
    console.log('File contents: ', data);
});




