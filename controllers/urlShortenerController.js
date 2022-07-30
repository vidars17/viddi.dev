const urlService = require("../services/urlService");


module.exports = (app) => {

    //Redirect route
    app.get("/s/:key", (req, res) => {
        urlService.getUrl(req.params.key, (result) => {
            res.redirect(result[0].url);
        }, (error) => {
            console.log(error);
            res.status(404);
        }
        );

        
    });

    app.post("/urlShortener/", async (req, res) => {
        var originalUrl = req.body.url;
        
        if(!urlService.isValidUrl(originalUrl)) {
            return res.render("./urlShortener.ejs", {invalidUrl: true})
        };

        var shortenedUrl = urlService.createHashKey(originalUrl);
        //Check if the hash exists already so we don't make a duplicate
        var result = await urlService.hashExists(shortenedUrl);


        if(result === null){
            urlService.createShortenedUrl(originalUrl, shortenedUrl, () => {
                return res.render("./urlShortener.ejs", {shortenedUrl: `https://viddi.dev/s/${shortenedUrl}`})
            }, (error) => {
                console.log(error);
                res.status(400);
            });
            
        } else {
            return res.render("./urlShortener.ejs", {shortenedUrl: `https://viddi.dev/s/${shortenedUrl}`})
            
        }
    
    });

}