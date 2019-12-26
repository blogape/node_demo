/**
 * @description 失败信息集合 包括error和message
 * @author ZeHua
 */




module.exports = {
    registerUserNotExistInfo: {
        errno: -1,
        message: '用户名已存在'
    },
    registerUserExistInfo: {
        errno: -1,
        message: '注册失败'
    },
    loginFaildInfo: {
        errno: -1,
        message: '用户名或者密码错误'
    },
    deleteFaildInfo: {
        errno: -1,
        message: '删除失败'
    },
    argmentFaildInfo: {
        errno: -1,
        message: '传参错误'
    },
    updateFaildInfo: {
        errno: -1,
        message: '更新失败'
    }
}