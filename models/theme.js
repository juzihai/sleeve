//业务对象
//theme banner spu sku address user

import {Http} from "../utils/http";

class Theme {
    static locationA = 't-1'
    static locationE = 't-2'
    static locationF = 't-3'
    static locationH = 't-4'
    themes = []

    //扩展性
    async getThemes() {
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
        this.themes = await Http.request({
            url: `theme/by/names`,
            data: {
                names
            }
        })
    }

    getHomeLocationA() {
        return this.themes.find(t => t.name === Theme.locationA);
    }

    getHomeLocationE() {
        return this.themes.find(t => t.name === Theme.locationE);
    }

    getHomeLocationF() {
        return this.themes.find(t => t.name === Theme.locationF);
    }

    getHomeLocationH() {
        return this.themes.find(t => t.name === Theme.locationH);
    }

    //static 是不是加和什么时候应该加
    //取舍条件是否需要保存状态
    //是不是每个方法都需要加await 不需要等待做处理的不加，
    //async 强制返回pomise 这里http本身就是，所以async也可以不加
     static  getHomeLocationESpu() {
        return Theme.getThemeSpuByName(Theme.locationE)
    }

     static  getThemeSpuByName(name){
        return  Http.request({
            url:`theme/name/${name}/with_spu`
        })
         //类的对象。实例属性
    }

}

export {
    Theme
}

