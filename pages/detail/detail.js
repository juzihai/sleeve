// pages/detail/detail.js
import {Spu} from "../../models/spu";
import {SaleExplain} from "../../models/sale-explain";
import { ShoppingWay} from "../../core/enum";
import {System} from "../../utils/system";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRealm: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let pid = options.pid
    const spu = await Spu.getDetail(pid)
    const explain = await SaleExplain.getFixed()
    const windowHeightRpx = await System.getWindowHeightRpx()
    const h=windowHeightRpx-100
    this.setData({
      spu,
      explain,
      h
    })
    /**
     * 能调试解决掉问题都不是问题
     * 原理性的
     * 知识点性的
     * 逻辑思维性的
     *
     */

  },
  onAddToCart(){
    this.setData({
      showRealm:true,
      orderWay: ShoppingWay.CART
    })
  },
  onBuy(){
    this.setData({
      showRealm:true,
      orderWay: ShoppingWay.BUY
    })
  },
  onGotoHome(event) {
    wx.switchTab({
        url: '/pages/home/home'
    })
},

onGotoCart(event) {
    wx.switchTab({
        url: '/pages/cart/cart'
    })
},
onSpecChange(event){
  this.setData({
    specs:event.detail
  })
}
})