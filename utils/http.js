import {config} from "../config/config";
import {promisic} from "./util";

class Http {
    static async request({url, data, method = "GET"}) {
        const res= await promisic(wx.request )({
            url: `${config.apiBaseUrl}${url}`,
            method: method,
            data: data,
            header: {
                appkey: config.appkey
            }
        })
        console.log('接口=', url, '参数=', data, '返回参数', res);
        return res.data
    }
}

//统一异常处理方案

// wx.request
// promisic(wx.request)({
//     url:'',
//     data:data,
// })
// promisic(wx.getStorage)
// promisic(wx.showToast)()
//动态类型 非常常见 python
//java c# 委托


export {
    Http
}