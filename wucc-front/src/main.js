import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueYouTubeEmbed from 'vue-youtube-embed'

import './plugins/base';
import './vee-validate-rules'


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    VueYouTubeEmbed,
    render: h => h(App)
}).$mount("#app");
