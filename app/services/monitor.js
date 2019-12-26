/**
 * @description 监控服务
 * @author ZeHua
 */

const { Monitor, Monitor_host, Node_service } = require('../db/model');

/**
 * 获取监控服务 所有信息
 */


async function getMonitorServerce() {
    const result = await Monitor.findOne({
        attributes: ["id", "config_id", "node_name", "host_name", "host_ip", "os_info", "cpu_info", "mem_info", "disk_info", "net_info", "status", "is_online", "is_online", "start_time"]
    })
    return result.dataValues;
}


/**
 * 拿到服务下的所有节点
 * @param {string} nodeName  节点名称
 */
async function getMonitorHostServer() {

    const result = await Monitor_host.findOne({
        attributes: ["host_ip", "cpu_usage", "mem_usage", "disk_usage", "net_usage", "net_detail"],
    })
    return result.dataValues;
}


/**
 * 查询所有服务节点
 */
async function getAllMonitorServerce() {
    const result = await Monitor.findAll({
        attributes: ["id", "config_id", "node_name", "host_name", "host_ip", "os_info", "cpu_info", "mem_info", "disk_info", "net_info", "status", "is_online", "is_online", "start_time"]
    })
    return result;
}


/**
 * 查询服务下的所有节点
 */
async function findtAllMonitorNode(node_name) {
    const opt = {
        node_name
    }
    const result = await Node_service.findAll({
        attributes: ["id", "dc_name", "host_ip", "process_name", "pid", "port_info", "status", "is_online"],
        where: opt
    })
    return result;
}


module.exports = {
    getMonitorServerce,
    getMonitorHostServer,
    getAllMonitorServerce,
    findtAllMonitorNode
}