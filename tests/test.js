/**
 * Created by moepus on 07/03/2017.
 */
const md5 = require("../index");
const crypto = require('crypto')

TESTSTR = 'bufferBUFFERbuffer';
const buf = Buffer.from(TESTSTR);

md5(buf).then(val=>{console.log("Co-MD5 result1:",val)});
md5(buf,2).then(val=>{console.log("Co-MD5 result2:",val)});
md5(TESTSTR).then(val=>{console.log("Co-MD5 result3:",val)});
md5(TESTSTR,2).then(val=>{console.log("Co-MD5 result4:",val)});
md5("md5",buf).then(val=>{console.log("Co-MD5 result5:",val)});
md5("md5",buf,2).then(val=>{console.log("Co-MD5 result6:",val)});
md5("md5",TESTSTR).then(val=>{console.log("Co-MD5 result7:",val)});
md5("md5",TESTSTR,2).then(val=>{console.log("Co-MD5 result8:",val)});
md5.md5(TESTSTR,2).then(val=>{console.log("Co-MD5 result9:",val)});
md5.sha1(TESTSTR,2).then(val=>{console.log("Co-MD5 sha-1 result:",val)});
md5.sha256(TESTSTR,2).then(val=>{console.log("Co-MD5 sha-256 result:",val)});


try
{
    md5.none(TESTSTR,2).then(val=>{console.log("Co-MD5 none result:",val)});
}
catch(err)
{
    console.error("Co-MD5 err:",err.message);
}


console.log("MD5 result:",crypto.createHash('md5').update(buf).digest('hex'));
