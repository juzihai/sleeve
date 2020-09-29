// pages/category/category.js
import {System} from "../../utils/system";
import {Categories} from "../../models/categories";
import {SpuListType} from "../../core/enum";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultRootId: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.initCategoryData()
    this.setDynamicSegmentHeight()
  },
  async initCategoryData(){
    const categories = new Categories()
    this.data.categories = categories
    await categories.getAll()
    const roots = categories.getRoots()
    const defaultRoot = this.getDefaultRoot(roots)
    const currentSubs = categories.getSubs(defaultRoot.id)
    this.setData({
      roots,
      currentSubs,
      currentBannerImg: defaultRoot.img
    })
  },
  getDefaultRoot(roots) {
    let defaultRoot = roots.find(r=>r.id === this.data.defaultRootId)
    if (!defaultRoot){
      defaultRoot = roots[0]
    }
    return defaultRoot
  },

  async setDynamicSegmentHeight() {
    const windowHeightRpx = await System.getWindowHeightRpx()
    const h = windowHeightRpx - 60 - 20 - 2
    this.setData({
        segHeight: h
    })
},
/**
 rate
 750rpx                        x
 ---------         =         --------- 
 res.screenwidth             res.windowHeight
 */
  onGotoSearch(){
      wx.navigateTo({
        url: '/pages/search/search',
      })
  },
  onSegChange(event){
    const rootId = event.detail.activeKey
    console.log(rootId)
    const currentSubs = this.data.categories.getSubs(rootId)
    const currentRoot = this.data.categories.getRoot(rootId)

    this.setData({
        currentSubs,
        currentBannerImg:currentRoot.img
    })
  },
  onJumpToSpuList(event) {
    const cid = event.detail.cid;

    wx.navigateTo({
      url: `/pages/spu-list/spu-list?cid=${cid}&type=${SpuListType.SUB_CATEGORY}`
    })
  },
})