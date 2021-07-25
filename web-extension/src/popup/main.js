import Vue from "vue";
import App from "./App.vue";
import Icon from '@/components/Icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBullseye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faBullseye, faHeart);
Vue.component('fa-icon', FontAwesomeIcon);

Vue.component('Icon', Icon);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
});
