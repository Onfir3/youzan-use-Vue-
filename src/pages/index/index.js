import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import Foot from 'components/Foot.vue'
import Swipe from 'components/Swipe.vue'

import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll)



let app = new Vue({
    el: '#app',
    data: {
        lists: null, //或""
        pageNum: 1,
        pageSize: 6,
        loading: false,   //函数节流
        allLoaded: false,   //判断是否完全加载完毕
        bannerLists: null
    },
    created () {
        this.getLists()
        this.getBanner()
    },
    methods: {
        getLists(){
            if (this.allLoaded) return //开始时就判断allLoaded，如果等于true就直接返回
            this.loading = true //请求进来的时候就不会再请求了，避免反复请求
            axios.get(url.hotLists, {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                let curLists = res.data.lists
                if (curLists.length < this.pageSize) { //判断数据条目是否比pageSize要小，或者说判断数据是否加载完毕
                    this.allLoaded = true   //如果小，那么allLoaded等于true,说明已经到底了
                } else {
                    
                }
                if (this.lists) { //判断lists是否存在，第一次肯定不存在。因为data里lists为空
                    this.lists  = this.lists.concat(curLists) //将新数组和原来的数组拼到一起再赋值给它
                } else {
                    //第一次请求数据
                    this.lists = curLists
                }
                this.loading = false //请求完成以后可以再次请求
                this.pageNum++
            })
        },
        getBanner(){
            axios.get(url.banner).then(res => {
                this.bannerLists = res.data.lists
            })
        }
    },
    components: {
        Foot,
        Swipe
    }
})