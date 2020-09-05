// components/relam/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
      spu:Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    judger:Object,
  },
  lifetimes:{
    attached(){

    }
    // ready

    // create

  },
  observers:{
      'spu':function (spu) {
        if (!spu){
          return
        }
        const fencesGroup =new FenceGroup(spu)
        fencesGroup.initFences()
        const judger = new Judger(fencesGroup)
        this.data.judger=judger
        this.bindInitData(fencesGroup)
        console.log('我是fencesGroup',fencesGroup)
      }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindInitData(fenceGroup){
      this.setData({
        fences:fenceGroup.fences
      })
    },

    onCellTap(event){
      const {cell,x,y} =event.detail
      //Object
      //fences
      //引用类型

      // const a ={c:1}
      // const b=a
      // b.c=2
      // a.c 2

      console.log('我是点击回调',event.detail)
      const judger =this.data.judger
      console.log("我是judger类".judger)
      judger.judge(cell,x,y)
      this.setData({
        fences:judger.fenceGroup.fences
      })

    }

  }
})
