const data = require("./data/db.js");

function get_url(key, errorCb) {
    //Get the original url
};

function shorten_url(url, cb, errorCb) {
    let key = create_hashkey(url);
    //Create DB entry here with hashkey and url

};

function create_hashkey(url) {
    //Create a short hashkey from original url
};

module.exports = {
    get_url,
    shorten_url
};