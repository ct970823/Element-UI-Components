import Paging from './paging.vue'
// 这里是重点
const paging = {
    install: function(Vue){
        Vue.component('paging',Paging)
    }
}

// 导出组件
export default paging