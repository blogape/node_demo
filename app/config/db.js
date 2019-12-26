/**
 * @description 数据存储配置
 * @author ZeHua
 */



// let MYSQL_CONF = {  //  本地mysql 配置
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     port: '3306',
//     database: 'koa2_weibo_db'
// }


let MYSQL_CONF = {  // mysql 配置
    host: '192.168.124.78',
    user: 'root',
    password: 'lilobin148',
    port: '3306',
    database: 'chatmgr'
}

let REDIS_CONF = { // redis 配置
    port: 6379,
    host: '127.0.0.1'
}


module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}