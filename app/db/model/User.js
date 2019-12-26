/**
 * @description 用户数据模型
 * @author ZeHua
 */
const seql = require('../seq');
const { STRING, DECIMAL, TEXT, INTEGER, BOOLEAM } = require('../types');

const User = seql.define('user_admins', {
    user_name: {
        type: STRING,
        allowNull: false
    },
    password: {
        type: STRING,
        allowNull: false
    },
    nick_name: {
        type: STRING,
        allowNull: false
    },
    phone: {
        type: STRING,
        allowNull: false
    },
    note: {
        type: STRING,
        allowNull: true
    }

})

module.exports = User;