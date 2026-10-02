const cache = {};

const TTL = 60 * 1000; 

function cacheMiddleware(req, res, next) {

    const key = req.originalUrl;
    const value = cache[key];

    if (!value) {
        res.set('X-Cache', 'MISS');
        return next();
    }


    const age = Date.now() - value.createdAt;


    if (age >= TTL) {
        delete cache[key];

        res.set('X-Cache', 'MISS');
        return next();
    }


    res.set('X-Cache', 'HIT');
    return res.json(value.data);
}


function clearCache() {
    Object.keys(cache).forEach((key) => {
        delete cache[key];
    });
}

module.exports = {
    cache,
    cacheMiddleware,
    clearCache
};