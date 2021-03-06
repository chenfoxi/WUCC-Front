import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import CKEditor from '@ckeditor/ckeditor5-vue';

import './plugins/base';
import './vee-validate-rules'


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    CKEditor,
    render: h => h(App)
}).$mount("#app");
