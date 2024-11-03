// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 
// Try to do an expensive operation below the file read and see how it affects the output. 
// Make the expensive operation more and more expensive and see how it affects the output. 


const fs = require("fs");

const filePath = 'a.txt';

fs.readFile(filePath, 'utf-8', (err, data) => {
    if(err) {
        console.error('Error reading file', err);
        return;
    }
    console.log('File content', data);

});

function expensiveOperation() {
    let sum = 0; 
    for(let i = 0; i < 1e8; i++) {
        sum += 1;
    }
    console.log('Expensive operation result', sum);
}

expensiveOperation();
