// components/hot-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banner:Object
  },
  observers:{
    'banner':function (banner) {
      if (!banner){
        return;
      }
      if(banner.items.length === 0){
        return;;
      }
      //根据json的名称进行数据绑定
      const left = banner.items.find(i => i.name === 'left'); //js6的语法
      const rightTop = banner.items.find(i => i.name === 'right-top');
      const rightBottom = banner.items.find(i => i.name === 'right-bottom');
      this.setData({
        left,
        rightTop,
        rightBottom
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
