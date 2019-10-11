import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate'

import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll)

let {keyword,id} = qs.parse(location.search.substr(1)) //对象的解构赋值

new Vue({
    el:'#app',
    data: {
        searchList: null,
        keyword,
        isShow : false,
        pageNum : 1,
        pageSize : 8,
        loading: false,
        allLoaded: false,

    },
    created () {
        this.getSearchList()
    },
    methods: {
        getSearchList() {
            if (this.allLoaded) return //开始时就判断allLoaded，如果等于true就直接返回
            this.loading = true //请求进来的时候就不会再请求了，避免反复请求
            axios.get(url.searchList, {
                keyword,id,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                let curLists = res.data.lists
                console.log(curLists)
                if (curLists.length < this.pageSize) { //判断数据条目是否比pageSize要小，或者说判断数据是否加载完毕
                    this.allLoaded = true   //如果小，那么allLoaded等于true,说明已经到底了
                }  else if (this.pageNum > 15) {  //出了bug，无限请求，QAQ，强行判断pageNum终止请求，日后想办法弄好
                     this.allLoaded = true
                 }
                if (this.searchList) { //判断searchList是否存在，第一次肯定不存在。因为data里searchList为空
                    this.searchList  = this.searchList.concat(curLists) //将新数组和原来的数组拼到一起再赋值给它
                    console.log('ccc' + this.searchList)
                } else {
                    //第一次请求数据
                    this.searchList = curLists
                }
                this.loading = false //请求完成以后可以再次请求
                this.pageNum++
                
            })
            
            
        },
        move() {
            if(document.documentElement.scrollTop > 200){   //当出现document.body.scrollTop一直是0的情况
                this.isShow = true                          //就是DTD的问题，页面指定了DTD，即指定了DOCTYPE时，使用document.documentElement.scrollTop。
                console.log("scrollTop")                    //页面没有DTD，即没指定DOCTYPE时，使用document.body.scrollTop。
            } else {
                this.isShow = false
                console.log(document.body.scrollTop)
            }
        },
        toTop() {
            Velocity(document.body,'scroll', { duration : 1000 } )
        }
    },
    mixins: [mixin]
})