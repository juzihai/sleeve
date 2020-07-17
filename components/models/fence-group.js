import {Matrix} from "./matrix";
import {Fence} from "./fence";

class FenceGroup {
    spu
    skuList=[]
    fences = []
    constructor(spu) {
        this.spu=spu
        this.skuList=spu.sku_list
    }

//知识点型 逻辑思维型
    initFences1(){
        // const a=[1,2,3]
        const matrix=this._createMatrix(this.skuList)
        console.log('我是矩阵对象',matrix)
        const fences=[]
        let currentJ=-1

        matrix.each((element,i,j)=>{
            console.log('我是矩阵',i,j,element)
            if(currentJ!==j){
                //开启一个新的列，需要创建一个新的fence
                currentJ=j
                //currentFence
                fences[currentJ]= this._currentFence(element)
            }
            fences[currentJ].pushValueTitle(element.value)
        })
    }
    //数学，，基本的思维（对编程的重要性）
    //矩阵尺寸

    initFences(){
        const matrix=this._createMatrix(this.skuList)
        console.log('我是矩阵对象',matrix)
        const fences=[]
        const AT=matrix.transpose()
        console.log(AT)
        AT.forEach(r=>{
            const fence =new Fence(r)
            fence.init()
            fences.push(fence)
        })
        this.fences=fences
        // console.log(fences)
    }

    _currentFence(element){
        const fence=new Fence()
        return fence
    }

    _createMatrix(skuList){
        const m=[]
        skuList.forEach(sku=>{
            m.push(sku.specs)
        })
        return new Matrix(m)

        // [[1,2,3],[2,3,4],[4,5,6]]
        // 1、借助数学函数库
7``        // 2、不用，借用矩阵思维
    }
}

export {
    FenceGroup
}
