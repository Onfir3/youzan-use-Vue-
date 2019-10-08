import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import Foot from 'components/Foot.vue'

new Vue({
    el:'#app',
    data:{
        topLists: null,
        topIndex: 0 ,   //焦点状态的切换就是每一次点击以后要把当前的Index作为一个全局的赋值，然后拿到topIndex和当前的这个去比
        subData : null,
        rankData : null
    },
    created () {
        this.getTopList()
        this.getSubList(0)
    },
    methods: {
      getTopList(){
          axios.get(url.topList).then(res => {
              this.topLists = res.data.lists
          }).catch(res => {

          })
      },
      getSubList(index,id){
          console.log(index,id)
        this.topIndex = index
        if (index === 0) {
            this.getRank()
        } else {
            axios.get(url.subList, { id }).then(res => {
                this.subData = res.data.data
            })
        } 
      },
      getRank()  {
        axios.get(url.rank).then(res => {
            this.rankData = res.data.data
        })
      },
      toSearch(list) {
         location.href = `search.html?keyword=${list.name}&id=${list.id}`
      }
    },
    components: {
        Foot
    }
})