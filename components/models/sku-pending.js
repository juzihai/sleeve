import {Cell} from "./cell";
import { Joiner } from "../../utils/joiner";

class SkuPending {
    pending = []
    size
    constructor(size) {
        this.size = size
    }
    init(sku){
        // this.size = sku.specs.length
        sku.specs.forEach((s,i)=>{
            const cell = new Cell(s)
            this.insertCell(cell,i)
        })
    }
    getSkuCode(){
        const joiner = new Joiner()
        this.pending.forEach(cell=>{
            
        })
    }
    isIntact(){ 
        // if(this.size !== this.pending.length){
        //     return false
        // }
        for (let i =0; i<this.size;i++){
            if(this._isEmptyPart(i)){
                return false
            }
        }
        return true
    }
//是否是空
    _isEmptyPart(index) {
        return !this.pending[index]
    }

    insertCell(cell,x){
        this.pending[x]=cell
    }
    removeCell(x){
        this.pending[x]=null
    }
    findSelectedCellByX(x){
        return this.pending[x]
    }

    isSelected(cell,x){
        const pendingCell = this.pending[x]
        if (!pendingCell){
            return false
        }
        return cell.id === pendingCell.id
    }

}

export {
    SkuPending
}