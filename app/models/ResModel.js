/**
 * @description  res的数据模型
 * @author ZeHua
 */


// 基础模块
class BaseModel {
    constructor({ errno, data, message }) {
        this.errno = errno;
        if (data) {
            this.data = data;
        }
        if (message) {
            this.message = message;
        }
    }
}


/**
 * 成功数据模型
 */

class SucessModel extends BaseModel {
    constructor(data = {}) {
        super({
            errno: 0,
            data
        })
    }
}

/**
 * 失败的数据模型
 */

class ErrorModel extends BaseModel {
    constructor({ errno, message }) {
        super({
            errno,
            message
        })
    }
}

module.exports = {
    SucessModel,
    ErrorModel
}