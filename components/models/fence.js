import {Cell} from "./cell";

class Fence {

    cells = [];
    specs
    title
    id

    constructor(specs) {
        this.specs=specs
        this.title=specs[0].key
        this.id=specs[0].key_id
    }

    init(){
       this._initCells()
    }
    _initCells(){
        this.specs.forEach(s=>{
            // this.pushValueTitle(s.value)
            //some(只要一个符合就会返回true) every(所有符合才会返回true)
            const existed = this.cells.some(c=>{
                return c.id === s.value_id
            })
            if(existed){
                return
            }
            const  cell=new Cell(s)
            this.cells.push(cell)
        })
    }

    setFenceSketch(skuList){
        this.cells.forEach(c=>{
            this._setCellSkuImg(c,skuList)
        })
    }
    _setCellSkuImg(cell,skuList){
        const specCode = cell.getCellCode()
        const matchedSku = skuList.find(s=>s.code.includes(specCode))
        if(matchedSku){
            cell.skuImg=matchedSku.img
        }
    }
    // valueTitles=[]
    // pushValueTitle(title){
    //     this.valueTitles.push(title)
    // }

}
export {
    Fence
}