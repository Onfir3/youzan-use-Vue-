
let url = {
    hotLists: '/index/hotLists',
    banner: '/index/banner'
}

//开发环境和真实环境的切换
// let host = 'http://rapapi.org/mockjsdata/24170'
//  let host = 'http://rap2api.taobao.org/app/mock/7058'
//  let host = 'http://rapapi.org/mockjsdata/23334'
 let host = 'https://www.easy-mock.com/mock/5c9c3045d172204b3a07ecb0/youzan'
for (let key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key]
        
    }
}

export default url