// components/cell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      cell:Object,
    y:Number,
    x:Number
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
    onTap(event){
      this.triggerEvent('celltap',{
        //子组件 父组件传参
        cell:this.properties.cell,
        x:this.properties.x,
        y:this.properties.y,
      },{
        bubbles:true,//是否冒泡
        composed:true,//是否跨越组件
      })
    }

  }
})
