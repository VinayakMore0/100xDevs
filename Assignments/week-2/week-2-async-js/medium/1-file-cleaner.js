// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require('fs').promises;

async function cleanFile(filename) {
    try {
        const content = await fs.readFile(filename, 'utf-8');

        const cleanedContent = content.replace(/\s+/g, ' ').trim();

        await fs.writeFile(filename, cleanedContent);

        console.log(`File ${filename} has been cleaned.`);  
    } catch (err) {
        console.error('Error.', error.message);
    }
}

const filename = 'a.txt';
cleanFile(filename);



