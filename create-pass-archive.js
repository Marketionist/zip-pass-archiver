const fs = require('fs');
const path = require('path');
const Minizip = require('minizip-asm.js');
const mz = new Minizip();

// let image = fs.readFileSync('./image1.jpg');
// let text = new Buffer('Abc text');

// mz.append('test-folder/abc.txt', text, { password: '123' });
// mz.append('test-folder/abc1.jpg', image, { password: '123' });
// fs.writeFileSync('abc.zip', new Buffer(mz.zip()));

// To run script execute: node create-pass-archive.js 'new-arch-name' 'pass1234' '../test-folder' '../test-folder 2'
// OR
// If you use Windows execute: node create-pass-archive.js 'new-arch-name' 'pass1234' '..\test-folder' '..\test-folder 2'
const directories = process.argv.slice(4);

console.log(`Folders to archive:`);

Promise.all(directories.map((dir, index, array) => {
    console.log(`${dir}`);
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                return reject(err);
            } else {
                resolve(files);
            }
        });
    }).then((files) => {
        console.log('Files to archive:', files);
        return Promise.all(files.map((file) => {
            return new Promise((resolve, reject) => {
                const pathToFile = path.join(dir, file);

                fs.readFile(pathToFile, (err, data) => {
                    if (err) {
                        return reject(err);
                    } else {
                        // compressLevel default=5
                        // possible values: 0 - store only, 1 - compress faster, 9 - compress better
                        mz.append(pathToFile, data, { password: process.argv[3], compressLevel: 9 });
                        resolve(process.stdout.write('.'));
                    }
                });
            });
        }));
    });
})).then(function () {
    const fileName = process.argv[2];

    console.log(`\nWriting out archived files to: ${fileName}.zip`);

    fs.writeFile(`${fileName}.zip`, Buffer.from(mz.zip()), (err) => {
        if (err) { throw err; }
        console.log('Done');
    });

}).catch(function (err) {
    console.log(err);
});
