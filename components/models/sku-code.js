import {combination} from "../../utils/util";


class SkuCode {
    code
    spuId
    totalSegments = []
    constructor(code) {
        this.code=code
        this._splistToSegments()
    }
    _splistToSegments(){

        const spuAndSpec=this.code.split('$')
        this.spuId = spuAndSpec[0]

        const specCodeArray = spuAndSpec[1].split('#')
        const  length =specCodeArray.length

        for (let i =1;i<=length;i++){
          const segments = combination(specCodeArray,i)
            console.log(segments)
        }

    }
}
export {
    SkuCode
}