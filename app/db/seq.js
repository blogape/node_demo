/**
 * @description sequelize 实例
 * @author ZeHua
 */

const Sequlize = require('sequelize');
const { MYSQL_CONF } = require('../config/db.js');
const { host, user, password, database } = MYSQL_CONF;

const conf = {
    host: host,
    dialect: 'mysql',
    define: {
        "timestamps": false,
        "freezeTableName": true
    }
}

const seq = new Sequlize(database, user, password, conf);
module.exports = seq;