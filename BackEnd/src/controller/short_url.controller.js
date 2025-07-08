import { findUrlFromShortUrl } from "../dao/short_url.js";
import { createShortUrlwithoutUser, createShortUrlwithUser } from "../services/short_url.services.js"
export const short_urlController = async (req, res) => {
    const { originalUrl } = req.body;

    let shortUrl;
    if(req.user){
         shortUrl = await createShortUrlwithUser(originalUrl, req.user._id);    
    }
    else{
         shortUrl = await createShortUrlwithoutUser(originalUrl);
    }

    res.status(200).json({
        data : process.env.DOMAIN  + '/' + shortUrl.short_url
    });
    
}

export const customShort_urlController = async (req, res) => {
    const { originalUrl, slug } = req.body;
    
    let shortUrl;
    if(req.user){
        shortUrl = await createShortUrlwithUser(originalUrl, req.user._id, slug);    
    }
    else{
        shortUrl = await createShortUrlwithoutUser(originalUrl, slug);
    }

    res.status(200).json({
        data : process.env.DOMAIN  + '/' + shortUrl.short_url
    });
}


export const redirectFromShortUrl = async (req, res) => {
    const { id } = req.params;
    const originalUrl = await findUrlFromShortUrl(id);
    console.log(originalUrl);

    if (originalUrl) {
        res.redirect(originalUrl.full_url);
    } else {
        res.status(404).send("Not Found");
    }
}