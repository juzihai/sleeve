import {SkuCode} from "./sku-code";

class Judger {
    feceeGroup
    pathDict =[]
    constructor(feceeGroup) {
        this.feceeGroup=feceeGroup
        this.initPathDict()
    }

    initPathDict(){
        this.feceeGroup.spu.sku_list.forEach(s=>{
            const skuCode=new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
        console.log(this.pathDict)

    }
    
}

export {
    Judger
}