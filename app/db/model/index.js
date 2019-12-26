/**
 * @description 数据模型文件
 * @author ZeHua
 */

const User = require('./User');
const Monitor = require('./Monitor');
const Monitor_host = require('./Monitor_host');
const Node_service = require('./Node_service');

module.exports = {
    User,
    Monitor,
    Monitor_host,
    Node_service
}