import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";
class Judger {
    fenceGroup
    pathDict =[]
    skuPending
    constructor(fenceGroup) {
        this.fenceGroup=fenceGroup
        this._initSkuPending()
        this._initPathDict()
    }
    _initSkuPending(){
        this.skuPending = new SkuPending()
    }
    _initPathDict(){
        this.fenceGroup.spu.sku_list.forEach(s=>{
            const skuCode=new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
        console.log('我是所有路径',this.pathDict)

    }

    judge(cell,x,y){
        console.log("我是judger类judge",cell,x,y)
        this._changeCurrentCellStatus(cell,x,y)
        this.fenceGroup.eachCell((cell,x,y)=>{
            // this._changeOtherCellStatus(cell,x,y)
            const path = this._findPotentialPath(cell,x,y)
            console.log("我是潜在路径",path)
            if (!path){
                return
            }
            const isIn=this._isInDict(path)
            if (isIn){
                this.fenceGroup.fences[x].cells[y].status =CellStatus.WAITING
            }else {
                this.fenceGroup.fences[x].cells[y].status =CellStatus.FORBIDDEN
            }
        })
    }
    _isInDict(path){
        return this.pathDict.includes(path)
    }

    // _changeOtherCellStatus(cell,x,y){
    //     this._findPotentialPath(cell,x,y)
    // }
    _findPotentialPath(cell,x,y){

        const joiner = new Joiner('#')
        for (let i=0;i<this.fenceGroup.fences.length;i++){
            const selected=this.skuPending.findSelectedCellByX(i)
            if (x === i){
                //当前行 cell  id  1-42
                // if (cell.status === CellStatus.SELECTED){
                //     return
                // }
                if (this.skuPending.isSelected(cell,x)){
                    return
                }
                const cellCode =this._getCellCode(cell.spec)
                joiner.join(cellCode)

            }
            else {
                //其他行
                if (selected){
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode)
                }

            }
        }
        return joiner.getStr()
    }
    _getCellCode(spec){
        console.log("我是judger类spec",spec)
        return spec.key_id +"-" + spec.value_id
    }

    _changeCurrentCellStatus(cell,x,y){
        if(cell.status === CellStatus.WAITING){
            // cell.status = CellStatus.SELECTED
            this.fenceGroup.fences[x].cells[y].status =CellStatus.SELECTED
            this.skuPending.insertCell(cell,x)
        }
        if(cell.status === CellStatus.SELECTED){
            // cell.status = CellStatus.WAITING
            this.fenceGroup.fences[x].cells[y].status =CellStatus.WAITING
            this.skuPending.removeCell(x)
        }
    }

}

export {
    Judger
}