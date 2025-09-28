// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require('fs').promises;

async function writeToFile(filename, content) {
    try {
        await fs.writeFile(filename, content, 'utf-8');
        console.log('File has been written successfully');
    } catch (error) {
        console.error('Error writing to file: ', error);
    }
}

writeToFile('example.txt', 'Hello, World!');

