<!-- =========================================================================================
    File Name: Main.vue
    Description: Main layout
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    class="layout--main"
    :class="[
      layoutTypeClass,
      navbarClasses,
      footerClasses,
      { 'app-page': isAppPage }
    ]"
  >
    <vx-tour
      v-if="
        !disableThemeTour &&
          (windowWidth >= 1200 && mainLayoutType === 'vertical')
      "
      :steps="steps"
    />

    <the-customizer
      v-if="!disableCustomizer"
      :footer-type="footerType"
      :hide-scroll-to-top="hideScrollToTop"
      :navbar-type="navbarType"
      :navbar-color="navbarColor"
      :router-transition="routerTransition"
      @toggleHideScrollToTop="toggleHideScrollToTop"
      @updateFooter="updateFooter"
      @updateNavbar="updateNavbar"
      @updateNavbarColor="updateNavbarColor"
      @updateRouterTransition="updateRouterTransition"
    />

    <v-nav-menu
      :nav-menu-items="navMenuItems"
      :logo="navMenuLogo"
      title="Vuexy"
      parent=".layout--main"
    />

    <div
      id="content-area"
      :class="[contentAreaClass, { 'show-overlay': bodyOverlay }]"
    >
      <div id="content-overlay" />

      <!-- Navbar -->
      <template v-if="mainLayoutType === 'horizontal' && windowWidth >= 1200">
        <the-navbar-horizontal
          :navbar-type="navbarType"
          :logo="navMenuLogo"
          :class="[
            { 'text-white': isNavbarDark && !isThemeDark },
            { 'text-base': !isNavbarDark && isThemeDark }
          ]"
        />

        <div
          v-if="navbarType === 'static'"
          style="height: 62px"
        />

        <h-nav-menu
          :class="[
            { 'text-white': isNavbarDark && !isThemeDark },
            { 'text-base': !isNavbarDark && isThemeDark }
          ]"
          :nav-menu-items="navMenuItems"
        />
      </template>

      <template v-else>
        <the-navbar-vertical
          :navbar-color="navbarColor"
          :class="[
            { 'text-white': isNavbarDark && !isThemeDark },
            { 'text-base': !isNavbarDark && isThemeDark }
          ]"
        />
      </template>
      <!-- /Navbar -->

      <div class="content-wrapper">
        <div class="router-view">
          <div class="router-content">
            <transition :name="routerTransition">
              <div
                v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
                class="router-header flex flex-wrap items-center mb-6"
              >
                <div
                  class="content-area__heading"
                  :class="{
                    'pr-4 border-0 md:border-r border-solid border-grey-light':
                      $route.meta.breadcrumb
                  }"
                >
                  <h2 class="mb-1">
                    {{ routeTitle }}
                  </h2>
                </div>

                <!-- BREADCRUMB -->
                <vx-breadcrumb
                  v-if="$route.meta.breadcrumb"
                  class="ml-4 md:block hidden"
                  :route="$route"
                />
              </div>
            </transition>

            <div class="content-area__content">
              <back-to-top
                v-if="!hideScrollToTop"
                bottom="5%"
                visibleoffset="500"
              >
                <vs-button
                  icon-pack="feather"
                  icon="icon-arrow-up"
                  class="shadow-lg btn-back-to-top"
                />
              </back-to-top>

              <transition
                :name="routerTransition"
                mode="out-in"
              >
                <router-view @changeRouteTitle="changeRouteTitle" />
              </transition>
            </div>
          </div>
        </div>
      </div>
      <the-footer />
    </div>
  </div>
</template>

<script>
import BackToTop from "vue-backtotop";
import HNavMenu from "@/layouts/components/horizontal-nav-menu/HorizontalNavMenu.vue";
import navMenuItems from "@/layouts/components/vertical-nav-menu/navMenuItems.js";
import TheCustomizer from "@/layouts/components/customizer/TheCustomizer.vue";
import TheNavbarHorizontal from "@/layouts/components/navbar/TheNavbarHorizontal.vue";
import TheNavbarVertical from "@/layouts/components/navbar/TheNavbarVertical.vue";
import TheFooter from "@/layouts/components/TheFooter.vue";
import themeConfig from "@/../themeConfig.js";
import VNavMenu from "@/layouts/components/vertical-nav-menu/VerticalNavMenu.vue";

const VxTour = () => import("@/components/VxTour.vue");

export default {
  components: {
    BackToTop,
    HNavMenu,
    TheCustomizer,
    TheFooter,
    TheNavbarHorizontal,
    TheNavbarVertical,
    VNavMenu,
    VxTour
  },
  data() {
    return {
      disableCustomizer: themeConfig.disableCustomizer,
      disableThemeTour: themeConfig.disableThemeTour,
      footerType: themeConfig.footerType || "static",
      hideScrollToTop: themeConfig.hideScrollToTop,
      isNavbarDark: false,
      navbarColor: themeConfig.navbarColor || "#fff",
      navbarType: themeConfig.navbarType || "floating",
      navMenuItems: navMenuItems,
      navMenuLogo: require("@/assets/images/logo/kynd-1.svg"),
      routerTransition: themeConfig.routerTransition || "none",
      routeTitle: this.$route.meta.pageTitle,
      steps: [
        {
          target: "#btnVNavMenuMinToggler",
          content: "Toggle Collapse Sidebar."
        },
        {
          target: ".vx-navbar__starred-pages",
          content:
            "Create your own bookmarks. You can also re-arrange them using drag & drop."
        },
        {
          target: ".navbar-fuzzy-search",
          content: "Try fuzzy search to visit pages in flash."
        },
        {
          target: ".customizer-btn",
          content: "Customize template based your preference",
          params: {
            placement: "left"
          }
        }
      ]
    };
  },
  computed: {
    bodyOverlay() {
      return this.$store.state.app.bodyOverlay;
    },
    contentAreaClass() {
      if (this.mainLayoutType === "vertical") {
        if (this.verticalNavMenuWidth == "default")
          return "content-area-reduced";
        else if (this.verticalNavMenuWidth == "reduced")
          return "content-area-lg";
      }
      // else if(this.mainLayoutType === "boxed") return "content-area-reduced"
      else {
        return "content-area-full";
      }
      return "content-area-full";
    },
    footerClasses() {
      return {
        "footer-hidden": this.footerType == "hidden",
        "footer-sticky": this.footerType == "sticky",
        "footer-static": this.footerType == "static"
      };
    },
    isAppPage() {
      return this.$route.path.includes("/apps/") ? true : false;
    },
    isThemeDark() {
      return this.$store.state.app.theme == "dark";
    },
    layoutTypeClass() {
      return `main-${this.mainLayoutType}`;
    },
    mainLayoutType() {
      return this.$store.state.app.mainLayoutType;
    },
    navbarClasses() {
      return {
        "navbar-hidden": this.navbarType == "hidden",
        "navbar-sticky": this.navbarType == "sticky",
        "navbar-static": this.navbarType == "static",
        "navbar-floating": this.navbarType == "floating"
      };
    },
    verticalNavMenuWidth() {
      return this.$store.state.app.verticalNavMenuWidth;
    },
    windowWidth() {
      return this.$store.state.app.windowWidth;
    }
  },
  watch: {
    $route() {
      this.routeTitle = this.$route.meta.pageTitle;
    },
    isThemeDark(val) {
      const color = this.navbarColor == "#fff" && val ? "#10163a" : "#fff";
      this.updateNavbarColor(color);
    },
    "$store.state.mainLayoutType"(val) {
      this.setNavMenuVisibility(val);
      this.disableThemeTour = true;
    },
    windowWidth(val) {
      if (val < 1200) this.disableThemeTour = true;
    },
    verticalNavMenuWidth() {
      this.disableThemeTour = true;
    }
  },
  created() {
    const color =
      this.navbarColor == "#fff" && this.isThemeDark
        ? "#10163a"
        : this.navbarColor;
    this.updateNavbarColor(color);
    this.setNavMenuVisibility(this.$store.state.app.mainLayoutType);
  },
  methods: {
    changeRouteTitle(title) {
      this.routeTitle = title;
    },
    updateNavbar(val) {
      if (val == "static") this.updateNavbarColor("#fff");
      this.navbarType = val;
    },
    updateNavbarColor(val) {
      this.navbarColor = val;
      if (val == "#fff") this.isNavbarDark = false;
      else this.isNavbarDark = true;
    },
    updateFooter(val) {
      this.footerType = val;
    },
    updateRouterTransition(val) {
      this.routerTransition = val;
    },
    setNavMenuVisibility(layoutType) {
      if (
        (layoutType === "horizontal" && this.windowWidth >= 1200) ||
        (layoutType === "vertical" && this.windowWidth < 1200)
      ) {
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", false);
        this.$store.dispatch("updateVerticalNavMenuWidth", "no-nav-menu");
      } else {
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", true);
      }
    },
    toggleHideScrollToTop(val) {
      this.hideScrollToTop = val;
    }
  }
};
</script>
