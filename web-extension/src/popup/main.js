import Vue from "vue";
import App from "./App.vue";
import router from "../router";

import VSCrumbs from "@/components/vs-crumbs";
import Icon from '@/components/Icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBullseye, faHeart, faEllipsisV, faTrash, faTag, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faBullseye, faHeart, faEllipsisV, faTrash, faTag, faTags);
Vue.component('fa-icon', FontAwesomeIcon);
Vue.component('Icon', Icon);
Vue.component('vs-crumbs', VSCrumbs);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    router: router,
    el: "#app",
    render: (h) => h(App),
});
router.push({ path: '/' });
