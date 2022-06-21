if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}


const express = require("express");
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const lingua = require('lingua');

const port = process.env.APP_PORT;
const host = process.env.APP_HOST;


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))
app.set("view engine", "ejs");

app.use(lingua(app, {
	defaultLocale: 'en',
	path: __dirname + '/public/i18n'
}));



require("./JuniAPI/app")(app);

require("./controllers/urlShortenerController")(app, express);

app.get("/", (req, res) => {
	res.render("index.ejs");
});

app.get("/cv", (req, res) => {
	res.render("cv.ejs");
});

app.get("/urlShortener", (req, res) => {
	res.render("urlShortener.ejs");
});

app.use(function (req, res) {
	res.status(404).render("error", { error: "Sorry but that page doesn't exist.", statusCode: "404" });
});

app.listen(port, () => {
	console.log(`App listening at ${host}${port}`);
});
