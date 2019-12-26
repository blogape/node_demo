/**
 * @description 监控Api
 * @author ZeHua
 */


const { monitorServerce, monitorHostServer, getAllMonitorServer, getAllMonitorNode } = require('../controller/monitor');


module.exports = (router) => {
    // 添加前缀
    const prefix = '/api/monitor';
    /**
     * 系统基本配置
     */
    router.get(prefix + '/monitorServerce', async (ctx, next) => {
        ctx.body = await monitorServerce();
    })
    /**
     * 查询主机详细信息 
     */
    router.get(prefix + '/getServiceHostInfo', async (ctx, next) => {
        const { hostIp } = ctx.request.query;
        ctx.body = await monitorHostServer(hostIp);
    })

    /**
     * 查询所有服务节点
     */
    router.get(prefix + '/getAllMonitorServer', async (ctx, next) => {
        ctx.body = await getAllMonitorServer();
    })

    /**
     * 查询节点名称
     */
    router.get(prefix + '/findMonitorNode', async (ctx, next) => {
        const { nodeName } = ctx.request.query;
        ctx.body = await getAllMonitorNode(nodeName);
    })

}