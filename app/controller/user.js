/**
 * @description 用户 user controller
 * @author ZeHua
 */
const jwt = require('jsonwebtoken')
const { createUser, getUserInfo, getUserList, deleteUsers, getOneUserInfo, upadateUserInfor, restUserPwd } = require('../services/user');
const { SucessModel, ErrorModel } = require('../models/ResModel');
const { registerUserNotExistInfo, loginFaildInfo, deleteFaildInfo, registerUserExistInfo, argmentFaildInfo, updateFaildInfo } = require('../models/ErrorInfo');
const doCrypto = require('../utils/cryp');
const { JWT_KEY } = require('../config/secretKeys');



/**
 * 查询用户名是否存在
 * @param {string} userName  用户名
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName);
    if (userInfo) {
        return new SucessModel(userInfo);
    }
    else {
        return new ErrorModel(registerUserNotExistInfo);
    }
}

/**
 * 注册
 * @param {string} user_name  用户名 
 * @param {string} nick_name  昵称 
 * @param {string} phone  手机号码 
 * @param {string} password  密码 
 * @param {string} note  备注
 */
async function register({ user_name, nick_name, phone, password, note }) {

    if (!user_name || !nick_name || !phone || !password) {
        return new ErrorModel(registerUserExistInfo);
    }
    // 判断用户是否存在
    const userInfo = await getUserInfo(user_name);

    if (userInfo) {
        return new ErrorModel(registerUserNotExistInfo)
    }
    try {
        // 如果正确就去创建用户
        await createUser({
            user_name,
            nick_name,
            phone,
            password: doCrypto(password),
            note
        })
        return new SucessModel();
    } catch (ex) {
        console.error(ex.message, ex.stack);
    }
}


/**
 * 登陆
 * @param {string} user_name 用户名
 * @param {string} password 用户密码
 */
async function login(ctx, user_name, password) {
    if (!user_name || !password) {
        return new ErrorModel(loginFaildInfo);
    }
    // 获取用户信息
    const userInfo = await getUserInfo(user_name, doCrypto(password));
    let token;
    console.log(userInfo);

    if (!userInfo) { //登陆失败
        return new ErrorModel(loginFaildInfo);
    }

    //登陆成功
    ctx.session.userInfo = userInfo;
    //加密 userInfo
    if (userInfo) {
        token = jwt.sign(userInfo, JWT_KEY, { expiresIn: '24h' })
    }
    let user = Object.assign(userInfo, { token })
    return new SucessModel({ user });
}

/**
 * 查询用户列表
 */
async function userlist(user_name, phone, status, pages, current) {
    // 获取用户列表
    const userList = await getUserList(user_name || '', phone || '', status || '', pages, current);
    return new SucessModel(userList);
}

/**
 * 删除用户
 * @param {number} userId 
 */
async function deleteUser(userId) {
    if (!userId) {
        return new ErrorModel(argmentFaildInfo);
    }
    const result = await deleteUsers(userId);
    if (Number(result) === 0) {
        return new ErrorModel(deleteFaildInfo);
    }
    return new SucessModel();
}


/**
 *  获取用户详情
 * @param {number} userId  用户id
 */

async function getUserInfor(userId) {
    if (!userId) {
        return new ErrorModel(argmentFaildInfo);
    }
    const result = await getOneUserInfo(userId);
    return new SucessModel({ user: result })
}

/**
 * 更新用户信息
 * @param {string} user_name  用户名
 * @param {string} password  密码
 * @param {string} nick_name  昵称
 * @param {string} phone  手机号码
 * @param {string} note  备注
 */
async function updateUserInfo(user_id, user_name, nick_name, phone, note) {
    if (!user_name || !nick_name || !phone) {
        return new ErrorModel(argmentFaildInfo);
    }
    const result = await upadateUserInfor(user_id, user_name, nick_name, phone, note);
    if (result === 0) {
        return ErrorModel(updateFaildInfo)
    }
    return new SucessModel()
}


/**
 * 重置用户密码
 * @param {number} user_Id 
 */
async function restUserPw(user_Id) {
    if (!user_Id) {
        return new ErrorModel(argmentFaildInfo);
    }
    const result = await restUserPwd(user_Id, doCrypto('123456'));
    if (result === 0) {
        return ErrorModel(updateFaildInfo)
    }
    return new SucessModel()
}


module.exports = {
    register,
    isExist,
    login,
    userlist,
    deleteUser,
    getUserInfor,
    updateUserInfo,
    restUserPw
}