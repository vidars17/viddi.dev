const fs = require("fs");
const path = require("path");

const public = "public";
const uploadFolder = "uploads";

function remover() {
    return new Promise(resolve =>  {
        var fileArray = getFiles(path.join(process.cwd(), public, uploadFolder));
        console.log("I've been called - remover");
        fileArray.forEach(function(picture){
            var file = path.join(picture.path, picture.name);
            fs.unlinkSync(file);
        });
    resolve(true);
    })


    
}

function getFiles(dir){
    console.log(dir);
    var fileArray = [],
    files = fs.readdirSync(dir);
    files.forEach(function(file){
        console.log(file);
        var obj = {name: file, path: dir};
        fileArray.push(obj);
    });
    return fileArray;
}

module.exports = {
    remover
}