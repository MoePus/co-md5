const crypto = require('crypto')
const co = require('co')

const CACHESIZE = 4 * 1024 * 1024;//4MB

/**
 * Hash a Buffer with md5
 *
 * @param {string} [algorithm] optional options
 * @param {Buffer,string} [plain]
 * @param {number} [cacheSize] optional options
 * @return {Promise}
 */
let fn = function(algorithm,plain,cacheSize)
{
    if(typeof algorithm === "string")
    {
        if(typeof plain === "string")
        {
            plain = Buffer.from(plain);
        }else if(plain === undefined || typeof plain === 'number')
        {
            cacheSize = plain;
            plain = Buffer.from(algorithm);
            algorithm = 'md5';
        }
    }else
    {
        cacheSize = plain;
        plain = algorithm;
        algorithm = 'md5';
    }
    if(!plain)
        throw new Error('No data provided');
    if(!cacheSize)
        cacheSize = CACHESIZE;
    let M = crypto.createHash(algorithm);
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
module.exports = new Proxy(fn,{get(target,name)
{
    return function()
    {
        target = target.bind(this,name);
        return target.apply(this,arguments)
    };
}});