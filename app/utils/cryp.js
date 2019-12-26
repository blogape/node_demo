/**
 * @description 加密方法
 * @author ZeHua
 */

const crypto = require('crypto');
const { SCERET_KEY } = require('../config/secretKeys');

/**
 * md5 加密
 */

function _md5(content) {
    const md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
}


function doCrypto(content) {
    const str = `password=${content}&key=${SCERET_KEY}`;
    return _md5(str);
}

/**
 * 解密
 */

function decrypt() {
    const cipheriv = crypto.createDecipheriv('aes128', key, key);
    let Cupdate = cipheriv.update('63fc3b6fb3513831c3189d9eee92a1ed', 'hex', 'utf8');
    Cupdate += cipheriv.final('utf8')
    console.log(Cupdate)
}


module.exports = doCrypto;