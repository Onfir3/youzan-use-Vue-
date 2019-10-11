
import './goods_common.css'
import './goods_custom.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_theme.css'
import './goods.css'

import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import mixin from 'js/mixin.js'
import qs from 'qs'
import Swipe from 'components/Swipe.vue'

let {id} = qs.parse(location.search.substr(1))
let detailTab = ['商品详情','本店成交']

new Vue({
    el:'#app',
    data : {
        details : null,  
        detailTab, 
        tabIndex: 0,
        dealLists: null,
        bannerLists: null
    },
    created () {
        this.getDetails()
    },
    methods: {
        getDetails(){
            axios.get(url.details,{id}).then(res => {
                this.details = res.data.data
                this.bannerLists = []
                this.details.imgs.forEach(item => {
                    this.bannerLists.push({
                        clickUrl:'',
                        img: item
                    })
                    console.log(this.bannerLists)
                })
            })
        },
        getDeal(){
            axios.get(url.deal,{id}).then(res => {
                this.dealLists = res.data.data.lists
            })
        },
        changeTab(index){
            this.tabIndex = index
            if (index) {
                this.getDeal()
            }
        },
    },
    components: {
        Swipe
    },
    mixins: [mixin]
})