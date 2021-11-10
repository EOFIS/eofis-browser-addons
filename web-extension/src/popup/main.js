import Vue from "vue";
import App from "./App.vue";
import store from "@/store";
import router from "../router";

import VSCrumbs from "@/components/VSCrumbs.vue";
import Icon from '@/components/Icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBullseye, faHeart, faEllipsisV, faTrash, faTag, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faBullseye, faHeart, faEllipsisV, faTrash, faTag, faTags);
Vue.component('fa-icon', FontAwesomeIcon);
Vue.component('Icon', Icon);
Vue.component('vs-crumbs', VSCrumbs);

//Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    router: router,
    store: store,
    el: "#app",
    render: (h) => h(App),
});
router.push({ path: '/' });

browser.runtime.onMessage.addListener((message, sender, response) => {
    console.log(`POPUP MAIN: ${message}, ${sender}, ${response}`);
    return new Promise((resolve, reject) => {
        console.log(`POPUP MAIN MESSAGE RESPONSE: ${resolve}, ${reject}`);
        alert("POPUP CONTENT SCRIPT");
        setTimeout(() => {
            resolve('TURNIP');
        }, 300);
    });
});

let EOFISNote = browser.extension.getBackgroundPage().EOFISNote;
export { EOFISNote };
