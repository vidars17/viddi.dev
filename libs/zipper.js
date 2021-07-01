const archiver = require("archiver");
const fs = require("fs");
const path = require("path");

const public = "public";
const uploadFolder = "uploads"

function zip(filetype) {
  //Creates a zip archive
  return new Promise(resolve => {
    console.log("I've been called - zipper");
    var output = fs.createWriteStream(path.join(public, uploadFolder, "convertedFiles.zip"));
    var archive = archiver("zip", {
      zlib: { level: 1 } // Sets the compression level.
    });

    //Gets all files to be zipped
    var fileArray = getFiles(path.join(process.cwd(), public, uploadFolder), filetype);

    //Designates the file that is to be used for zipping
    archive.pipe(output);

    //Zipping all photos into the archive
    fileArray.forEach(function(picture){
      var file = path.join(picture.path, picture.name);
      archive.append(fs.createReadStream(file), { name: picture.name });
    });

    archive.on("error", function(error) {
      throw error;
    });

    archive.finalize();
    resolve(path.join(public, uploadFolder, "convertedFiles.zip"));
  });
}

function getFiles(dir, filetype){
  var fileArray = [],
    files = fs.readdirSync(dir);
  files.forEach(function(file){
    if(path.extname(dir) === filetype) {
      var obj = {name: file, path: dir};
      fileArray.push(obj);
    }
  });
  return fileArray;
}

module.exports = {
  zip
};