import Vue from "vue";
import Vuex from "vuex";
import { auth } from './modules/auth.module';
import { pathes } from './modules/pathes.module';
import { info } from "./modules/info.module";
import { event } from "./modules/event.module";
import { commentModule } from "./modules/comment.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      auth,
      pathes,
      info,
      event,
      commentModule
  }
});
