import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueResource from 'vue-resource';
import vueAplayer from 'vue-aplayer'

Vue.config.productionTip = false;

/*使用VueResource插件*/
Vue.use(VueResource,vueAplayer)
new Vue({
    router,
    render: h => h(App)
}).$mount("#app");


function setRem(val) {
    function toggle() {
        var width = document.documentElement.offsetWidth
        var fontSize = width / (val || 10)
        document.documentElement.style.fontSize = fontSize + 'px'
    }

    toggle()
    window.addEventListener('resize', toggle)
    document.addEventListener('DOMContentLoaded', toggle)
};
setRem()