import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import './plugins/base';
import VueYouTubeEmbed from 'vue-youtube-embed'

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    VueYouTubeEmbed,
    render: h => h(App)
}).$mount("#app");
