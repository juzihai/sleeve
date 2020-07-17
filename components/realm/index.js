// components/relam/index.js
import {FenceGroup} from "../models/fence-group";

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
        this.bindInitData(fencesGroup)
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
    }

  }
})
