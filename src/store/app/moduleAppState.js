/*=========================================================================================
  File Name: state.js
  Description: Vuex Store - state
==========================================================================================*/

import navbarSearchAndPinList from "@/layouts/components/navbar/navbarSearchAndPinList";
import themeConfig from "@/../themeConfig.js";
import colors from "@/../themeConfig.js";

export default {
  AppActiveUser: {
    photoURL: require("@/assets/images/portrait/small/avatar-s-11.png"), // From Auth
  },
  bodyOverlay: false,
  isVerticalNavMenuActive: true,
  mainLayoutType: themeConfig.mainLayoutType || "vertical",
  navbarSearchAndPinList: navbarSearchAndPinList,
  reduceButton: themeConfig.sidebarCollapsed,
  verticalNavMenuWidth: "default",
  verticalNavMenuItemsMin: false,
  scrollY: 0,
  starredPages: navbarSearchAndPinList.data.filter(
    page => page.highlightAction
  ),
  theme: themeConfig.theme || "light",
  themePrimaryColor: colors.primary,

  // Can be used to get current window with
  // Note: Above breakpoint state is for internal use of sidebar & navbar component
  windowWidth: null
};
