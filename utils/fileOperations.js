const fs = require('fs');
const filePath = 'example.txt';

exports.fileOperations = () => {
    fs.writeFile(filePath, 'Hello, Node.js!', (err) => {
        if (err) {
            return console.error('Error writing to file:', err);
        }
        console.log('File written successfully.');

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return console.error('Error reading file:', err);
            }
            console.log('File content:', data);

            fs.appendFile(filePath, '\nWelcome to file operations!', (err) => {
                if (err) {
                    return console.error('Error appending to file:', err);
                }
                console.log('File updated successfully.');

                fs.readFile(filePath, 'utf8', (err, updatedData) => {
                    if (err) {
                        return console.error('Error reading updated file:', err);
                    }
                    console.log('Updated file content:', updatedData);
                });
            });
        });
    });
};
