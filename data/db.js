const mongoose = require("mongoose");

const urlSchema = require("./Schemas/url")

const connectionString = `${process.env.MONGODB_CONNECTION_STRING}`;

const connection = mongoose.createConnection(connectionString, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false });

module.exports = {
    Urls : connection.model("Url", urlSchema)
}