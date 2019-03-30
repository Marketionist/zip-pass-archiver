# zip-pass-archiver
Node.js script to create Zip archive with password for any files or folders

## Usage
To run the archiving script you need to make sure you are in the right project directory with your terminal (you should
be in `zip-pass-archiver` folder) then just execute the next line of code:
```
node ./create-pass-archive.js 'new-archive-name' 'pass1234' '../test-folder' '../test-folder2'
```
where:
- `'new-archive-name'` is the name of new archive that will be created after running this script
- `'../test-folder'` is the path to the first folder that you want to archive (in this example `test-folder` is located
    one level up from our current `zip-pass-archiver` folder)
- `'../test-folder2'` is the path to the second folder that you want to archive (you can archive as much folders as you
    would like)

OR if you use Windows execute:
```
node create-pass-archive.js 'new-arch-name' 'pass1234' '..\test-folder' '..\test-folder 2'
```
Then wait for `Done` to be displayed in the output

## Thanks
If this list was helpful for you, please give it a **★ Star** on
[Github](https://github.com/Marketionist/testing-starter-kit)
