import {promisic} from "./util";
import {px2rpx} from "../miniprogram_npm/lin-ui/utils/util";

class System {
    static async getSystemSize(){
        const res =await promisic(wx.getSystemInfo)()
        console.log('结果',res)
        return {
            windowWidth:res.windowWidth,//可用区域
            windowHeight: res.windowHeight,
            screenWidth: res.screenWidth,//屏幕宽度
            screenHeight: res.screenHeight,
        }
    }
    static async getWindowHeightRpx(){
        const res = await this.getSystemSize()
        return px2rpx(res.windowHeight)
    }

}
export {
    System
}
