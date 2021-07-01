const im = require("imagemagick")

async function convertFileExtension(filePath, newFilePath) {
    return new Promise(resolve => {
        im.convert([filePath, newFilePath], (err) => {
            if(err) {
                console.log(err);
                resolve(false);
            } 
            else {
                resolve(true);
            }
        });
    })
}

module.exports = {
    convertFileExtension
}