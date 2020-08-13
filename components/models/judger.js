import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";

class Judger {
    fenceGroup
    pathDict =[]
    constructor(fenceGroup) {
        this.fenceGroup=fenceGroup
        this._initPathDict()
    }

    _initPathDict(){
        this.fenceGroup.spu.sku_list.forEach(s=>{
            const skuCode=new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
        console.log(this.pathDict)

    }

    judge(cell,x,y){
        console.log(cell,x,y)
        this._changeCurrentCellStatus(cell,x,y)
    }

    _changeCurrentCellStatus(cell,x,y){
        if(cell.status === CellStatus.WAITING){
            // cell.status = CellStatus.SELECTED
            this.fenceGroup.fences[x].cells[y].status =CellStatus.SELECTED
        }
        if(cell.status === CellStatus.SELECTED){
            // cell.status = CellStatus.WAITING
            this.fenceGroup.fences[x].cells[y].status =CellStatus.WAITING
        }
    }
    
}

export {
    Judger
}