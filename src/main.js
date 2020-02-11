/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
==========================================================================================*/

import Vue from "vue";
import App from "./App.vue";

// Vuesax Component Framework
import Vuesax from "vuesax";
import "material-icons/iconfont/material-icons.css"; // Material Icons
import "vuesax/dist/vuesax.css"; // Vuesax
Vue.use(Vuesax);

// axios
import axios from "./axios.js";
Vue.prototype.$http = axios;

// mock
import "./fake-db/index.js";

// Theme Configurations
import "../themeConfig.js";

// ACL
import acl from "./acl/acl";

// Globally Registered Components
import "./globalComponents.js";

// Styles: SCSS
import "./assets/scss/main.scss";

// Tailwind
import "@/assets/css/main.css";

// Vue Router
import router from "./router";

// Vuex Store
import store from "./store/store";

// Vuexy Admin Filters
import "./filters/filters";

// Clipboard
// import VueClipboard from "vue-clipboard2";
// Vue.use(VueClipboard);

// Tour
import VueTour from "vue-tour";
Vue.use(VueTour);
require("vue-tour/dist/vue-tour.css");

// Google Maps
// import * as VueGoogleMaps from "vue2-google-maps";
// Vue.use(VueGoogleMaps, {
//   load: {
//     // Add your API key here
//     key: "YOUR_API_KEY",
//     libraries: "places" // This is required if you use the Auto complete plug-in
//   }
// });

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from "vue2-hammer";
Vue.use(VueHammer);

// PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";

// Feather font icon
require("./assets/css/iconfont.css");

// Custom modals
// import VModal from 'vue-js-modal'
// Vue.use(VModal, { componentName: "v-modal" })

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

// import Amplify from "aws-amplify";
import Amplify from "@aws-amplify/core";

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    // identityPoolId: 'us-east-1:5a64838b-792e-4727-a05a-349c50cb185b',

    // REQUIRED - Amazon Cognito Region
    region: "us-east-1",

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: "us-east-1",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "us-east-1_Zs5FN6q2w",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "31kvj3ali519a982oh16i3okt8"
  }
});

// Vue Apollo GraphQL integration
import { apolloProvider } from "@/http/graphql";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  acl,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
