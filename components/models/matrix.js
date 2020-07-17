
class Matrix {
    m
    constructor(matrix) {
        this.m=matrix
    }
    get rowsNum(){
        return this.m.length;
    }
    get colsNum(){
        return this.m[0].length;
    }
    //经典生成器写法
    each(cb){
        for (let j=0;j<this.colsNum;j++){
            for (let i=0;i<this.rowsNum;i++){
                const element = this.m[i][j]
                cb(element,i,j)
            }
        }
    }
    // numpy 矩阵的转置
    transpose(){
        const destArr =[];
        for (let j=0;j<this.colsNum;j++){
            destArr[j]=[];
            for (let i=0;i<this.rowsNum;i++){
                destArr[j][i] = this.m[i][j]
            }
        }
        return destArr
    }
}

export {
    Matrix
}