const urlService = require("../services/urlService");

module.exports = (app) => {

    
    app.get("/s/:key", (req, res) => {
        urlService.getUrl(req.params.key, (result) => {
            res.redirect(result[0].url);
        }, (error) => {
            console.log(error);
            res.status(404);
        }
        );

        
    });

    app.post("/urlShortener/", (req, res) => {
        var originalUrl = req.body.url;
        var shortenedUrl = urlService.createHashKey(originalUrl);
        
        if(urlService.hashExists(shortenedUrl)){
            return res.render("./urlShortener.ejs", {shortenedUrl: `viddi.dev/s/${shortenedUrl}`})
        } else {
                urlService.createShortenedUrl(originalUrl, shortenedUrl, () => {
                    return res.render("./urlShortener.ejs", {shortenedUrl: `viddi.dev/s/${shortenedUrl}`})
                }, (error) => {
                    console.log(error);
                    res.status(400);
                });
        }
    
    });

}