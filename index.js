const crypto = require('crypto')
const co = require('co')

const CACHESIZE = 4 * 1024 * 1024;//4MB

/**
 * Hash a Buffer with md5
 *
 * @param {Buffer} [plain]
 * @param {number} [cacheSize] optional options
 * @return {Promise}
 */
module.exports = function(plain,cacheSize)
{
    if(!cacheSize)
        cacheSize = CACHESIZE;
    let M = crypto.createHash('md5');
    let Q = co(function*(){
        let len = plain.length;
        let processedLen = 0;
        while(processedLen + cacheSize <= len)
        {
            let afterLen = processedLen + cacheSize;
            yield new Promise(function(resolve)
            {
                M.update(plain.slice(processedLen,afterLen));
                resolve();
            });
            processedLen = afterLen;
        }
        yield new Promise(function(resolve)
        {
            M.update(plain.slice(processedLen));
            resolve();
        });
        return M.digest('hex');
    });
    return Q;
};