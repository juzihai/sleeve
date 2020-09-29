import {Http} from "../utils/http";

class Categories {
    roots = []
    subs = []
    async getAll() {
        const data = await Http.request({
            url: `category/all`
        })
        this.roots = data.roots
        this.subs = data.subs
    }
    getRoots() {
        return this.roots
    }

    getRoot(rootId) {
        return this.roots.find(r=>r.id == rootId)
    }
    // a. filter(): 主要用于筛选过滤数组，返回符合筛选条件的数据，不会改变原数组。
    //
    // b. map():主要用于循环遍历数组，也可以根据某些条件筛选数据，不会改变原数组。
    //
    // c. find(): 主要用于查找数组的数据，只要查找到一条符合条件的数据，直接返回，不会再继续查找下去。没有找到符合条件的数据返回undefined。
    getSubs(parentId) {
        return this.subs.filter(sub=>sub.parent_id == parentId)
        // return this.roots.find(r=>r.id === rootId)
    }
}
export {
    Categories
}