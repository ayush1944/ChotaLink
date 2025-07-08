import ShortUrl from '../models/shorturl.model.js';

export const saveShortUrl = async (originalUrl, shortURL, userId) => {
    const newUrl = new ShortUrl({
        full_url: originalUrl,
        short_url: shortURL,
    });
    if (userId) {
        newUrl.user = userId;
    }

    return await newUrl.save();
}

export const checkIfShortUrlExists = async (shortUrl) => {
    const url = await ShortUrl.findOne({ short_url: shortUrl });
    if (url) {
        return true;
    }
    return false;
}

export const findUrlFromShortUrl = async (shortUrl) => {
    const url = await ShortUrl.findOneAndUpdate({ short_url: shortUrl }, { $inc: { clicks: 1 } }, {new: true, useFindAndModify: false});
    if (url) {
        return url;
    }
    return null;
}