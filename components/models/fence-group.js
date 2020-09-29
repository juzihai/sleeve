import {Matrix} from "./matrix";
import {Fence} from "./fence";
import {CellStatus} from "../../core/enum";

class FenceGroup {
    spu
    skuList=[]
    fences = []
    constructor(spu) {
        this.spu=spu
        this.skuList=spu.sku_list
    }

//知识点型 逻辑思维型
//     initFences1(){
//         // const a=[1,2,3]
//         const matrix=this._createMatrix(this.skuList)
//         console.log('我是矩阵对象',matrix)
//         const fences=[]
//         let currentJ=-1
//
//         matrix.each((element,i,j)=>{
//             console.log('我是矩阵',i,j,element)
//             if(currentJ!==j){
//                 //开启一个新的列，需要创建一个新的fence
//                 currentJ=j
//                 //currentFence
//                 fences[currentJ]= new Fence(element)
//             }
//             fences[currentJ].pushValueTitle(element.value)
//         })
//     }
    //数学，，基本的思维（对编程的重要性）
    //矩阵尺寸

    getDefaultSku(){
        const defaultSkuId = this.spu.default_sku_id
        if (!defaultSkuId){
            return;
        }
        return this.skuList.find(s => s.id === defaultSkuId)

    }
    getSku(skuCode){
        const fullSkuCode = this.spu.id +'$' + skuCode
        const sku =this.spu.sku_list.find(s=> s.code === fullSkuCode)
        return sku ? sku : null
    }

    setCellStatusById(cellId,status){
        this.eachCell((cell)=>{
            if (cell.id === cellId){
                cell.status = status
            }
        })
    }
    setCellStatusByXY(x,y,status){
        this.fences[x].cells[y].status =status
    }

    initFences(){
        const matrix=this._createMatrix(this.skuList)
        console.log('我是矩阵对象',matrix)
        const fences=[]
        const AT=matrix.transpose()
        console.log('我是转置后的fences',AT)
        AT.forEach(r=>{
            const fence =new Fence(r)
            fence.init()
            if(this._hasSketchFence() && this._isSketchFence(fence.id)){
                fence.setFenceSketch(this.skuList)
            }
            fences.push(fence)
        })
        this.fences=fences
        console.log('我是fence处理后的fences',fences)
    }
    _hasSketchFence(){
        return this.spu.sketch_spec_id ? true:false
    }
    _isSketchFence(fenceId){
        return this.spu.sketch_spec_id === fenceId ? true:false
    }
    
    eachCell(cb){
        for (let i=0;i<this.fences.length;i++){
            for (let j=0;j<this.fences[i].cells.length;j++){
                const cell = this.fences[i].cells[j]
                cb(cell,i,j)
            }
        }
    }

    _createMatrix(skuList){
        const m=[]
        skuList.forEach(sku=>{
            m.push(sku.specs)
        })
        return new Matrix(m)

        // [[1,2,3],[2,3,4],[4,5,6]]
        // 1、借助数学函数库
        // 2、不用，借用矩阵思维
    }
}

export {
    FenceGroup
}
