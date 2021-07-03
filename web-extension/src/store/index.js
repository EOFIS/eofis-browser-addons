import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import note from "./modules/note";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, note },
	plugins: [createPersistedState()]
});
