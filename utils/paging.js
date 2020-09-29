import {Http} from "./http";

class Paging {
    //不关心细节
    //嗨，我需要下一页的数据了，你能给我吗
    //确定目的给做出接口
    // 保存状态
    // 实例化（对象）
    // new Paging
    start
    count
    req
    locker = false
    url
    moreData =true
    accumulator=[]

    constructor(req,count=10,start=0) {
        this.start=start
        this.count=count
        this.req=req
        this.url=req.url
    }

    async getMoreData(){
        //借鉴生成器 Generator思想

        //getLocker
        //request
        //releaseLocker
        if(!this.moreData){
            return null
        }
        if(!this._getLocker()){
            return null
        }
        const data=await this._actualGetData()
        this._releaseLocker()
        return data

    }
    //v1/spu/latest?start=0&count=10
    async _actualGetData(){
        const req =this._getCurrentReq()
        let paging =await Http.request(req)
        console.log(paging)
        if(!paging){
            return null
        }
        if(paging.total ==0){
            return {
                empty:true,
                items:[],
                moreData:false,
                accumulator:[]
            }
        }
        this.moreData = Paging._moreData(paging.total_page,paging.page)
        if(this.moreData){
            this.start += this.count
        }
        this._accumulator(paging.items)
        return {
            empty:false,
            items:paging.items,
            moreData:this.moreData,
            accumulator:this.accumulator
        }


        //数据结构
        // return '' 123
        // return {
        //     empty:Boolean,
        //     items:[],
        //     moreData:Boolean,
        //     accumulator:[]
        // }
        //HasMap
        //class  数据 方法 复杂结构甚至含有方法用class    
    }
    _accumulator(items){
        this.accumulator = this.accumulator.concat(items)
    }
    static _moreData(totalPage, pageNum){
        return pageNum < totalPage -1
    }


    _getCurrentReq(){
        let url = this.url;
        const params = `start=${this.start}&count=${this.count}`;
        if(url.includes('?')){
            url += '&' +params
        }else {
            url += '?' +params
        }
        this.req.url = url

        return this.req
        //值类型 引用类型 很容易不注意出现BUG
    }
    _getLocker(){//
        if(this.locker){//如果上锁返回false
            return false
        }
        this.locker=true   //未上锁时上锁
        return true
        //多用return提前结束函数，少用else 尤其是镶嵌
        //给思维 减负
    }

    _releaseLocker(){//释放锁
        this.locker=false
    }

}

export{
    Paging
}