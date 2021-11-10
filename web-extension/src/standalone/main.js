/* eslint-disable no-new */
import Vue from "vue";
import App from "./App.vue";
import router from "../router";
import store from "@/store";
import axios from "axios";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBullseye, faHeart, faEllipsisV, faTrash, faTag, faTags, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faBullseye, faHeart, faEllipsisV, faTrash, faTag, faTags, faCheck, faTimes);

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000/api/v0';
axios.interceptors.response.use(
    (response) => {
        console.log(`INT RX`);
        return response;
    },
    (error) => {
        console.log(`INT RX ERR`);
        if (error) {
            const srcRQ = error.config;
            if (error.response.status === 401 && !srcRQ._retry) {
                srcRQ._retry = true;
                store.dispatch("logout");
                return router.push("/login");
            }
        }
        return error;
    });

// What does this mean?
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    el: "#app",
    render: (h) => h(App),
});
