/**
 * @description   封装 sequelize 数据类型
 * @author ZeHua
 */

const sequlize = require('sequelize');

module.exports = {
    STRING: sequlize.STRING,
    DECIMAL: sequlize.DECIMAL,
    TEXT: sequlize.TEXT,
    INTEGER: sequlize.INTEGER,
    BOOLEAN: sequlize.BOOLEAN
}