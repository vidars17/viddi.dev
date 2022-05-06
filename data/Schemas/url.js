const Schema = require("mongoose").Schema;

module.exports = new Schema({
    key: {type: String, required: true},
    url: { type: String, required: true}
});