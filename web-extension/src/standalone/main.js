/* eslint-disable no-new */
import Vue from "vue";
import App from "./App.vue";
import router from "../router";
import store from "../store";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000/api/v0';
axios.interceptors.response.use(undefined, function (error) {
	if (error) {
		const srcRQ = error.config;
		if (error.response.status === 401 && !srcRQ._retry) {
			srcRQ._retry = true;
			store.dispatch("logout");
			return router.push("/login");
		}
	}
});

// What does this mean?
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  el: "#app",
  render: (h) => h(App),
});
