import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import "./styles/index.less"
import 'amfe-flexible'
import '@/utils/day.js'
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
    router,
    store,

    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
    },
}).$mount('#app')