const db = require("../data/db");
const shortHash = require('short-hash');

function getUrl(key, cb, errorCb) {
    db.Urls.find({key:key}, (error, response)=>{
        if(error){
            errorCb(error);
        } else {
            cb(response);
        }
    })
}

function createShortenedUrl(orgUrl, shortUrl, cb, errorCb) {
    db.Urls.create({key:shortUrl, url:orgUrl}, async (error, success) => {
        if(error) {
            errorCb(error);
        } else {
            cb(success);
        }
    })
}

function createHashKey(url) {
    return shortHash(url);
}

async function hashExists(hash) {
    return db.Urls.exists({key:hash});

}

module.exports = {
    getUrl,
    createShortenedUrl,
    createHashKey,
    hashExists
}