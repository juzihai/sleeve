import {SkuCode} from "./sku-code";

class Judger {
    feceeGroup
    pathDict =[]
    constructor(feceeGroup) {
        this.feceeGroup=feceeGroup
    }

    initPathDict(){
        this.feceeGroup.spu.sku_list.forEach(s=>{
            const skuCode=new SkuCode(s.code)
        })

    }
    
}

export {
    Judger
}