/**
 * @description 监控
 * @author ZeHua
 */

const { getMonitorServerce, getMonitorHostServer, getAllMonitorServerce, findtAllMonitorNode } = require('../services/monitor');
const { SucessModel, ErrorModel } = require('../models/ResModel');
const { registerUserNotExistInfo, loginFaildInfo, deleteFaildInfo, registerUserExistInfo, argmentFaildInfo, updateFaildInfo } = require('../models/ErrorInfo');

/**
 * 查询监控服务信息
 */
async function monitorServerce() {
    const service = await getMonitorServerce();
    return new SucessModel(service);
}

/**
 * 查询监控服务详细信息
 * @param {string} hostIp 
 */
async function monitorHostServer(hostIp) {
    if (!hostIp) {
        return new ErrorModel(argmentFaildInfo);
    }
    const result = await getMonitorHostServer(hostIp);
    return new SucessModel(result)
}


/**
 * 查询所有服务节点
 */
async function getAllMonitorServer() {
    const service = await getAllMonitorServerce();
    return new SucessModel(service);
}



/**
 * 拿到服务下的所有节点
 * @param {string} nodeName 
 */
async function getAllMonitorNode(nodeName) {
    if (!nodeName) {
        return new ErrorModel(argmentFaildInfo);
    }
    const result = await findtAllMonitorNode(nodeName);
    return new SucessModel(result)
}



module.exports = {
    monitorServerce,
    monitorHostServer,
    getAllMonitorServer,
    getAllMonitorNode
}