import { Http } from '../utils/http'
class Spu {

    static isNoSpec(spu){
        //无规格定义，唯一一个sku 没有规格
        if(spu.sku_list.length ===1 && spu.sku_list[0].specs.length ===0){
            return true
        }
        return false;
    }

    static async getDetail(id) {
        return await Http.request({
            url: `spu/id/${id}/detail`,
        })
    }
}

export {
    Spu
}