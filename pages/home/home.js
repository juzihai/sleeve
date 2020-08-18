// pages/home.js
import {Theme} from "../../models/theme";
import {Banner} from "../../models/banner";
import {Category} from "../../models/category";
import {Activity} from "../../models/activity";
import {SpuPaging} from "../../models/spu-paging";

Page({
    data: {
        themeA: null,
        themeE: null,
        bannerB: null,
        grid: [],
        activityD: null,
        spuPaging: null,
        loadingType: 'loading',
        showCoupon:true,
    },

    /**
     * 生命周期函数--监听页面加载
     * 业务逻辑
     * 数据绑定
     * view视图层 业务逻辑层 桥梁 中间件
     * MVC c     m写业务
     */
    onLoad(options) {
        
        this.initAllData()
        this.initBottomSpuList();
        
    },
    async initBottomSpuList(){
        const spuPaging = SpuPaging.getLatestPaging();
        this.data.spuPaging = spuPaging;
        const data = await spuPaging.getMoreData();
        if(!data){
            return
        }
        wx.lin.renderWaterFlow(data.items,true)
    },

    async initAllData() {
        const theme = new Theme();
        await theme.getThemes();
        const themeA = theme.getHomeLocationA();
        const themeE = theme.getHomeLocationE();
        let themeESpu = []
        if (themeE.online) {
            const data = await Theme.getHomeLocationESpu()
            if (data) {
                themeESpu = data.spu_list.slice(0, 8)
            }
        }
        const themeF = theme.getHomeLocationF();
        const bannerB = await Banner.getHomeLocationB();
        const grid = await Category.getHomeLocationC();
        const activityD = await Activity.getHomeLocationD();

        const bannerG = await Banner.getHomeLocationG();
        const themeH = await theme.getHomeLocationH();

        //符号化业务对象
        //调用方 调用过程是简单的
        this.setData({
            themeA,
            bannerB,
            grid,
            activityD,
            themeE,
            themeESpu,
            themeF,
            bannerG,
            themeH,
        })
        //矩阵
    },
    async onReachBottom() {

        const data =await this.data.spuPaging.getMoreData()
        if(!data){
            return
        }
        wx.lin.renderWaterFlow(data.items)
        if(!data.moreData){
            this.setData({
                loadingType:'end'
            })
        }
    }
})