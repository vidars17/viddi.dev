const Schema = require("mongoose").Schema;

module.exports = new Schema({
    key: {type: String, required: true, unique: true},
    url: { type: String, required: true}
});