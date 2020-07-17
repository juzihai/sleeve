import {Http} from "../utils/http";
import { Paging } from "../utils/paging";

class SpuPaging {

    // static async getSpu(start = 1, count = 5) {
    //     return await Http.request({
    //         url: 'spu/latest',
    //         data: {
    //             start,
    //             count
    //         }
    //     })
    // }

    static getLatestPaging(){
        return new Paging({
            url:`spu/latest`
        },5)
    }


    // 1、一条数据没有 空
    // 2、最后一页，还有没有更多的数据
    // 3、累加 100 1-20  ，  21-40  ...  setData 重新渲染页面
    // 4、非分页数据：a。正在加载  loading  b。空
    //   分页数据： a.正在加载 b。加载完成 c。没有更多数据
    // 5、上滑页面触底 加载 避免用户重复发请求  redis 虽然加载快，但是也需在前端限制无意义的操作 数据锁
    // 按钮 button  防抖  截流  禁用状态  倒计时  模态 loading
    //start count 10   0， 10 ，20
    //类 函数 ES6 class JS 主流语言 思维方式 OO 类
    //class JS 面向，模拟OO class在思维方式 和其他语言统一了

    //1-20  ，21-40，41-60
    //1-40 ，1-60  累加性

}
export {
    SpuPaging
}

