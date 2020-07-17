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
        calendarConfig: {
            showLunar: true,
            chooseAreaMode: true,
            // firstDayOfWeek: 'Mon',
            // disableMode: {
            //   type: 'after',
            //   date: '2020-03-9'
            // },
            // defaultDay: '2020-3-6'
            // multi: true
          },
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
    oninit(){
    
        this.calendar.jump(2018, 6, 6);
        this.calendar.setTodoLabels({
            // 待办点标记设置
            pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
            dotColor: 'purple', // 待办点标记颜色
            circle: false, // 待办圆圈标记设置（如圆圈标记已签到日期），该设置与点标记设置互斥
            showLabelAlways: true, // 点击时是否显示待办事项（圆点/文字），在 circle 为 true 及当日历配置 showLunar 为 true 时，此配置失效
            days: [
              {
                year: 2018,
                month: 1,
                day: 1,
                todoText: '待办',
                color: '#f40' // 单独定义代办颜色 (标记点、文字)
              },
              {
                year: 2018,
                month: 5,
                todoText: '待办',
                day: 15,
                color: '#f40' // 单独定义代办颜色 (标记点、文字)
              }
            ]
          });

          this.calendar.chooseDateArea(['2019-12-28', '2020-1-10']).then(dates => {
            console.log('choosed dates: ', dates);
          });
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