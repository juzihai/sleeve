// components/relam/index.js
import {
  FenceGroup
} from "../models/fence-group";
import {
  Judger
} from "../models/judger";
import {
  Spu
} from "../../models/spu";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    judger: Object,
    previewImage: String,

  },
  lifetimes: {
    attached() {

    }
    // ready
    // create
  },
  // A 提拉米苏 10寸, 无规格
  // B 提拉米苏 草莓味 8寸 10寸
  // sku 概念必须要有 规格
  observers: {
    'spu': function (spu) {
      if (!spu) {
        return
      }
      if (Spu.isNoSpec(spu)) {
        this.processNoSpec(spu)
      } else {
        this.processHasSpec(spu)
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    processNoSpec(spu) {
      this.setData({
        noSpec: true,
        // skuIntact
      })
      this.bindSkuData(spu.sku_list[0])
    },
    processHasSpec(spu) {
      const fencesGroup = new FenceGroup(spu)
      fencesGroup.initFences()
      const judger = new Judger(fencesGroup)
      this.data.judger = judger

      const defaultSku = fencesGroup.getDefaultSku()
      console.log('我是judger', judger)
      console.log('我是defaultSku', defaultSku)
      if (defaultSku) {
        this.bindSkuData(defaultSku)
      } else {
        this.bindSpuData()
      }
      this.bindTipData()
      this.bindFenceGroupData(fencesGroup)
    },

    bindSpuData() {
      const spu = this.properties.spu
      this.setData({
        previewImage: spu.img,
        title: spu.title,
        price: spu.price,
        discountPrice: spu.discount_price,
      })
    },
    bindSkuData(sku) {
      this.setData({
        previewImage: sku.img,
        title: sku.title,
        price: sku.price,
        discountPrice: sku.discount_price,
        stock: sku.stock,
      })
    },
    bindTipData(){
      this.setData({
        skuIntact: this.data.judger.isSkuIntact()
      })
    },
    bindFenceGroupData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences,
      })
    },

    onCellTap(event) {
      const {
        cell,
        x,
        y
      } = event.detail
      //Object
      //fences
      //引用类型

      // const a ={c:1}
      // const b=a
      // b.c=2
      // a.c 2

      const judger = this.data.judger
      judger.judge(cell, x, y)
      const skuIntact=this.data.judger.isSkuIntact()
      if(skuIntact){
        const code = judger._findPotentialPath(cell,x,y)
        this.bindSkuData()
      }
      this.bindFenceGroupData(judger.fenceGroup)
    }

  }
})