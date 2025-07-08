import {generateNanoId} from '../utils/helper.js';
import {checkIfShortUrlExists, saveShortUrl} from '../dao/short_url.js';

export const createShortUrlwithoutUser = async (originalUrl) => {
        const shortURL =  generateNanoId(8);
        const savedShortUrl = await saveShortUrl(originalUrl, shortURL);
        
        return savedShortUrl;
}

export const createShortUrlwithUser = async (originalUrl, userId, slug = null) => {
        const shortURL = slug? slug : generateNanoId(8) ;

        const exist = await checkIfShortUrlExists(shortURL);
        if (exist) {
            throw new Error("Short URL already exists");
        }
        const savedShortUrl = await saveShortUrl(originalUrl, shortURL, userId);
        return savedShortUrl;
}

