/**
 * Created by moepus on 07/03/2017.
 */
const md5 = require("../index");
const crypto = require('crypto')

const buf = Buffer.from('bufferBUFFERbuffer');

let Q = md5(buf,2);

Q.then(val=>{console.log("Co-MD5 result: ",val)});

console.log("MD5 result: ",crypto.createHash('md5').update(buf).digest('hex'));
