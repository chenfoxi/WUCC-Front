import Vue from "vue";
import Vuex from "vuex";
import { auth } from './modules/auth.module';
import { pathes } from './modules/pathes.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      auth,
      pathes
  }
});
