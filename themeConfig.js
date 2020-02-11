/*=========================================================================================
  File Name: themeConfig.js
  Description: Theme configuration
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/

// MAIN COLORS - VUESAX THEME COLORS
let colors = { 
  primary: "#1066BE",
  success: "#3DBD9E",
  danger: "#BE143D",
  warning: "#EF8F00",
  dark: "#22292f"
};

import Vue from "vue";
import Vuesax from "vuesax";
Vue.use(Vuesax, { theme: { colors } });

// CONFIGS
const themeConfig = {
  disableCustomizer: false, // options[Boolean] : true, false(default)
  disableThemeTour: false, // options[Boolean] : true, false(default)
  footerType: "hidden", // options[String]  : static(default) / sticky / hidden
  hideScrollToTop: false, // options[Boolean] : true, false(default)
  mainLayoutType: "vertical", // options[String]  : vertical(default) / horizontal
  navbarColor: "#fff", // options[String]  : HEX color / rgb / rgba / Valid HTML Color name - (default: #fff)
  navbarType: "sticky", // options[String]  : floating(default) / static / sticky / hidden
  routerTransition: "zoom-fade", // options[String]  : zoom-fade / slide-fade / fade-bottom / fade / zoom-out / none(default)
  sidebarCollapsed: false, // options[Boolean] : true, false(default)
  theme: "semi-dark", // options[String]  : "light"(default), "dark", "semi-dark"

  // Not required yet - WIP
  userInfoLocalStorageKey: "userInfo"

  // NOTE: themeTour will be disabled in screens < 1200. Please refer docs for more info.
};

export default themeConfig;
