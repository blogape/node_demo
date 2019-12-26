
/**
 * @description  用户服务
 * @author ZeHua
 */


const { User } = require('../db/model/index')


/**
 * 获取用户信息
 * @param {string} userName  用户名
 * @param {string} password  用户密码
 */
async function getUserInfo(user_name, password) {
    const whereOpt = {
        user_name
    }
    if (password) {
        Object.assign(whereOpt, { password });
    }
    //查询
    const result = await User.findOne({
        attributes: ['id', 'user_name', 'nick_name', 'phone', 'status', 'note'],
        where: whereOpt
    })
    //未找到
    if (result == null) {
        return result;
    }
    //格式化
    const formateRes = result.dataValues;
    return formateRes;

}



/**
 * 获取用户信息
 * @param {number} user_id  用户id
 */
async function getOneUserInfo(id) {
    const whereOpt = {
        id
    }
    //查询
    const result = await User.findOne({
        attributes: ['id', 'user_name', 'nick_name', 'phone', 'status', 'note'],
        where: whereOpt
    })
    //未找到
    if (result == null) {
        return result;
    }
    //格式化
    const formateRes = result.dataValues;
    return formateRes;

}



/**
 * 创建用户
 * @param {string} user_name  用户名
 * @param {string} nick_name  用户昵称
 * @param {string} password 密码
 * @param {string} phone  手机号码
 * @param {string} note  备注
 */
async function createUser({ user_name, nick_name, phone, password, note }) {
    const result = await User.create({
        user_name,
        nick_name,
        password,
        phone,
        note
    })
    return result.dataValues;
}


/**
 * 获取用户列表
 */
async function getUserList(nick_name, phone, status, pages, current) {
    console.log(pages, current);

    //查询
    const whereOpt = {};
    // 如果有用户名
    if (nick_name) {
        Object.assign(whereOpt, { nick_name });
    }
    // 如果条件带有手机号码

    if (phone) {
        Object.assign(whereOpt, { phone })
    }

    // 如果有状态

    if (status) {
        Object.assign(whereOpt, { status });
    }
    console.log(Number(current));

    const result = await User.findAndCountAll({
        attributes: ['id', 'user_name', 'nick_name', 'phone', 'status', 'note'],
        where: whereOpt,
        limit: Number(current),
        offset: Number(pages)
    })
    return result;
}

/**
 * 删除用户 
 */
async function deleteUsers(userId) {
    const result = await User.destroy({
        where: { 'id': userId }
    })
    return result;
}



/**
 * 更新用户信息
 * @param {number} user_id  用户Id
 * @param {string} user_name  用户名
 * @param {string} password  密码
 * @param {string} nick_name  真实名称
 * @param {string} phone  手机号码
 * @param {string} note  备注
 */
async function upadateUserInfor(user_id, user_name, password, nick_name, phone, note) {
    const result = await User.update({
        user_id, user_name, password, nick_name, phone, note
    }, { where: { id: user_id } })
    return result;
}

/**
 * 重置用户密码
 * @param {number} user_id  用户id
 * @param {string} password  密码
 */
async function restUserPwd(user_id, password) {
    const result = await User.update({
        password
    },
        {
            where: { id: user_id }
        }
    )
    return result;
}


module.exports = {
    getUserInfo,
    createUser,
    getUserList,
    deleteUsers,
    getOneUserInfo,
    upadateUserInfor,
    restUserPwd
}