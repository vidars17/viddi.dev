if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}


const express = require("express");
const app = express();
const serveIndex = require("serve-index");
const path = require('path');
const favicon = require('serve-favicon');
const formidable = require("formidable");
const bodyParser = require("body-parser");

const fs = require("fs");
const shell = require("shelljs");
const zipper = require("./libs/zipper");
const imLibs = require("./libs/im");
const rm = require("./libs/remover");

const port = process.env.APP_PORT;
const host = process.env.APP_HOST;

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads/", serveIndex(__dirname + "/public/uploads/"));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")))
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index.ejs");
})
app.get("/convert", (req, res) => {
	rm.remover();
	res.render("convertImageExt.ejs");
})
app.post("/convert/:fileType", (req, res) => {
	var uploadPath = path.join(__dirname, "public", "uploads");
	if (!fs.existsSync(uploadPath)) {
		shell.mkdir("-p", uploadPath);
	}
	var form = new formidable.IncomingForm();
	form.maxFileSize = 3000 * 1024 * 1024;
	form.multiples = true;
	form.keepExtensions = true;
	form.uploadDir = uploadPath;
	var picCount = 0;
	var filetype = `${req.params.fileType}`;
	var zippedFile; 
	
	
	form.on("file", async (fields, file) => {
		
		var newFilePath = `${file.path.split(".").slice(0, -1).join(".")}`

		
		if (await imLibs.convertFileExtension(file.path, `${newFilePath}.${filetype}`)) {
			picCount += 1;
		};
		
		return;
	}
	

	)

	form.on("error", function (error) {
        console.log("An error has occured: \n" + error);
    });

    form.on("progress", (bytesReceived, bytesExpected) => {
		
		if (bytesReceived === bytesExpected) {
			setTimeout( async () => {
				if (picCount > 1) {	
					zippedFile = await zipper.zip(filetype);
				}
			}, 2000);
    	}
	})
	form.on("end", function () {
		setTimeout( async() => {
			res.download(zippedFile, "convertedFiles.zip", (err) => {
				if(err) {
					res.status(500).send({
						message: "Could  not download the file. " + err,
					})
				}
			})
		}, 2000);
	});
	
	form.parse(req);
})
app.listen(port, () => {
	console.log(`App listening at ${host}${port}`);
})
