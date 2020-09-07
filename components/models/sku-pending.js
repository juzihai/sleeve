import {Cell} from "./cell";

class SkuPending {
    pending = []
    size
    constructor() {
    }
    init(sku){
        sku.specs.forEach((s,i)=>{
            const cell = new Cell(s)
            this.insertCell(cell,i)
        })
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