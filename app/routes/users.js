/**
 * @description User api
 * @author ZeHua
 */

const { register, login, userlist, deleteUser, getUserInfor, updateUserInfo, restUserPw } = require('../controller/user');

module.exports = (router) => {
  //  添加前缀
  const prefix = '/api/user';
  /**
   *  注册
   */
  router.post(prefix + '/register', async function (ctx, next) {
    const { user_name, password, nick_name, phone, note } = ctx.request.body;
    ctx.body = await register({ user_name, nick_name, phone, password, note })
  })


  /**
   * 登陆
   */
  router.post(prefix + '/login', async (ctx, next) => {
    const { user_name, password } = ctx.request.body;
    ctx.body = await login(ctx, user_name, password)
  })

  /**
   * 查询用户列表
   */
  router.get(prefix + '/userlist', async (ctx, next) => {
    const { nick_name, phone, status, pages, current } = ctx.request.query;
    ctx.body = await userlist(nick_name, phone, status, pages, current);
  })

  /**
   * 删除后台管理用户
   */
  router.post(prefix + '/deleteUser', async (ctx, next) => {
    const { user_id } = ctx.request.body;
    ctx.body = await deleteUser(user_id);
  })
  /**
   * 查询单个用户信息
   */
  router.get(prefix + '/getUserInfo', async (ctx, next) => {
    const { user_id } = ctx.request.query;
    ctx.body = await getUserInfor(user_id);
  })

  /**
   * 更新用户信息
   */

  router.post(prefix + '/updateUserInfo', async (ctx, next) => {
    const { user_id, user_name, nick_name, phone, note } = ctx.request.body;
    ctx.body = await updateUserInfo(user_id, user_name, nick_name, phone, note);
  })

  /**
   * 重置用户密码
   */
  router.post(prefix + '/restUserPw', async (ctx, next) => {
    const { user_id } = ctx.request.body;
    ctx.body = await restUserPw(user_id);
  })


}
