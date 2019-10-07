import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
// import Foot from 'components/Foot.vue'
// import Swipe from 'components/Swipe.vue'

import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll)

// new Vue({
//   el: '.vue-el',
//   data: {
//     pageNum: 1,
//     pageSize: 6,
//     lists: null,
//     loading: false,
//     allLoaded: false,
//     bannerLists: null
//   },
//   created() {
//     this.getLists()
//     this.getBanner()
//   },
//   methods: {
//     getLists() {
//       if (this.allLoaded) return
//       this.loading = true
//       axios.post(url.hotLists, {
//         pageNum: this.pageNum,
//         pageSize: this.pageSize
//       }).then(res => {
//         let curLists = res.data.lists
//         if(curLists.length < this.pageSize) {
//           this.allLoaded = true
//         }
//         if (this.lists) {
//           this.lists = this.lists.concat(curLists)
//         } else {
//           this.lists = curLists
//         }
//         this.loading = false
//       })
//     },
//     getBanner() {
//       axios.get(url.banner).then(res => {
//         this.bannerLists = res.data.lists
//       })
//     }
//   },
//   components: {
//     Foot,
//     Swipe
//   }
// })

let app = new Vue({
    el: '#app',
    data: {
        lists: null, //或""
        pageNum: 1,
        loading: false,
        allLoaded: false
    },
    created () {
        this.getLists()
    },
    methods: {
        getLists(){
            axios.get(url.hotLists, {
                pageNum: this.pageNum,
                pageSize: 6
            }).then(res => {
                this.lists = res.data.lists
            })
        }
    }
})