import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 5,
  newestOnTop: true,
  position: "bottom-left",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
});

import VueHighlightJS from "vue-highlight.js";

import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import cpp from "highlight.js/lib/languages/cpp";
import python from "highlight.js/lib/languages/python";

import "highlight.js/styles/dark.css";

Vue.use(VueHighlightJS, {
  languages: {
    javascript,
    xml,
    css,
    cpp,
    python
  }
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
