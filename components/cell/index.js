// components/cell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      cell:Object
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
      console.log('12222333')
      this.triggerEvent('celltap',{
        //子组件 父组件传参
      })
    }

  }
})
