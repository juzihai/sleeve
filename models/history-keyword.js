class HistoryKeyword {
    static MAX_ITEM_COUNT = 20
    static KEY = 'keywords'

    keywords = []
    constructor() {
        //单例模式 保证全局只有一个类的实例
        if (typeof HistoryKeyword.instance === 'object'){
            return HistoryKeyword.instance
        }
        HistoryKeyword.instance=this
        this.keywords = this._getLocalKeywords()
        return this
    }

    //缓存中写入数据
    //去重 不插入
    save(keyword){
        const items = this.keywords.filter(k=>{
            return k === keyword
        })
        if (items.length != 0){
            return
        }
        if(this.keywords.length >= HistoryKeyword.MAX_ITEM_COUNT){
            this.keywords.pop()
        }
        this.keywords.unshift(keyword)//push是放在末尾 unshift放在首位
        this._refreshLocal()
        //  ------->
        // [万花，七秀，藏剑] 3
        // 万花
        // 栈还是队列 先进先出 队列
    }

    get(){
        return this.keywords
    }

    clear(){
        this.keywords = []
        this._refreshLocal()
    }
    _refreshLocal() {
        wx.setStorageSync(HistoryKeyword.KEY, this.keywords)
    }
    _getLocalKeywords() {
        const keywords = wx.getStorageSync(HistoryKeyword.KEY)
        if (!keywords) {
            wx.setStorageSync(HistoryKeyword.KEY, [])
            return []
        }
        return keywords
    }

}
export {
    HistoryKeyword
}