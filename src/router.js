/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
    path => router path
    name => router name
    component(lazy loading) => component to load
    meta : {
      rule       => which user can have access (ACL)
      breadcrumb => Add breadcrumb to specific page
      pageTitle  => Display title besides breadcrumb
    }
==========================================================================================*/

import Vue from "vue";
import store from "./store/store";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    };
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: "",
      component: () => import("./layouts/main/Main.vue"),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: "/",
          redirect: "/profile",
          authRequired: true
        },
        {
          path: "/dashboard/analytics",
          name: "dashboard-analytics",
          component: () => import("./views/DashboardAnalytics.vue"),
          meta: {
            rule: "editor", // This will need to be SUPER USER
            authRequired: true
          }
        },

        // =============================================================================
        // Application Routes
        // =============================================================================
        {
          path: "/apps/chat",
          name: "chat",
          component: () => import("./views/apps/chat/Chat.vue"),
          meta: {
            rule: "editor",
            authRequired: true
          }
        },
        {
          path: "/apps/calendar/vue-simple-calendar",
          name: "calendar-simple-calendar",
          component: () => import("./views/apps/calendar/SimpleCalendar.vue"),
          meta: {
            rule: "editor",
            authRequired: true
          }
        },
        {
          path: "/apps/search/shop",
          name: "ecommerce-shop",
          component: () => import("./views/apps/search/SearchCarers.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "search"
              },
              {
                title: "Search Carers",
                active: true
              }
            ],
            pageTitle: "Search Carers",
            rule: "editor",
            authRequired: true
          }
        },
        {
          path: "/apps/search/wish-list",
          name: "ecommerce-wish-list",
          component: () => import("./views/apps/search/SearchShortList.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "search",
                url: "/apps/search/shop"
              },
              {
                title: "Saved Carers",
                active: true
              }
            ],
            pageTitle: "Saved Carers",
            rule: "editor",
            authRequired: true
          }
        },
        {
          path: "/apps/search/checkout",
          name: "ecommerce-checkout",
          component: () => import("./views/apps/search/ECommerceCheckout.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "search",
                url: "/apps/search/shop"
              },
              {
                title: "Checkout",
                active: true
              }
            ],
            pageTitle: "Checkout",
            rule: "editor",
            authRequired: true
          }
        },

        // =============================================================================
        // Pages Routes
        // =============================================================================
        {
          path: "/profile",
          name: "page-profile",
          component: () => import("./views/pages/profile/Profile.vue"),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Pages"
              },
              {
                title: "Profile",
                active: true
              }
            ],
            authRequired: true,
            pageTitle: "Profile",
            rule: "editor"
          }
        },

        // =============================================================================
        // EXTENSIONS
        // =============================================================================
        {
          path: "/welcome",
          name: "page-welcome",
          component: () => import("./views/pages/welcome/WelcomeToKynd.vue"),
          meta: {
            authRequired: true,
            pageTitle: "",
            rule: "editor"
          }
        },
        {
          path: "/welcome/support-pro",
          name: "onboarding-support-pro",
          component: () =>
            import("./views/pages/welcome/support-pro/SupportPro.vue"),
          meta: {
            nullUser: true,
            authRequired: true
            // pageTitle: "Welcome to Kynd, new Member!",
            // rule: "editor"
          }
        },
        {
          path: "/welcome/member",
          name: "onboarding-member",
          component: () => import("./views/pages/welcome/Member/Member.vue"),
          meta: {
            authRequired: true
            // pageTitle: "Welcome to Kynd, new Support Pro!",
            // rule: "editor"
          }
        },
        {
          path: "/welcome/support-pro/wizard",
          name: "wizard-support-pro",
          component: () =>
            import("./views/pages/welcome/support-pro/SupportProWizard.vue"),
          meta: {
            nullUser: true,
            authRequired: true
            // pageTitle: "Welcome to Kynd, new Member!",
            // rule: "editor"
          }
        },
        {
          path: "/welcome/member/wizard",
          name: "wizard-member",
          component: () =>
            import("./views/pages/welcome/Member/MemberWizard.vue"),
          meta: {
            authRequired: true
            // pageTitle: "Welcome to Kynd, new Support Pro!",
            // rule: "editor"
          }
        },

        // =============================================================================
        // EXTENSIONS
        // =============================================================================
        {
          path: "/extensions/access-control",
          name: "extra-component-access-control",
          component: () =>
            import(
              "./views/components/extra-components/access-control/AccessControl.vue"
            ),
          meta: {
            breadcrumb: [
              {
                title: "Home",
                url: "/"
              },
              {
                title: "Extensions"
              },
              {
                title: "Access Control",
                active: true
              }
            ],
            authRequired: true,
            pageTitle: "Access Control",
            rule: "editor"
          }
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: "",
      component: () => import("./layouts/full-page/FullPage.vue"),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: "/login",
          name: "page-login",
          component: () => import("./views/pages/login/Login.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/register",
          name: "page-register",
          component: () => import("./views/pages/register/Register.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/forgot-password",
          name: "page-forgot-password",
          component: () => import("./views/pages/ForgotPassword.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/reset-password",
          name: "page-reset-password",
          component: () => import("./views/pages/ResetPassword.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/lock-screen",
          name: "page-lock-screen",
          component: () => import("./views/pages/LockScreen.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/error-404",
          name: "page-error-404",
          component: () => import("./views/pages/Error404.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/error-500",
          name: "page-error-500",
          component: () => import("./views/pages/Error500.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/not-authorized",
          name: "page-not-authorized",
          component: () => import("./views/pages/NotAuthorized.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/maintenance",
          name: "page-maintenance",
          component: () => import("./views/pages/Maintenance.vue"),
          meta: {
            rule: "editor"
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/pages/error-404"
    }
  ]
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

// this routine will ensure that any pages marked
// as `auth` in the`meta` section are protected.
router.beforeEach((to, from, next) => {
  // Use the page's router title to name the page
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }

  // Check if auth is required on this route
  // (including nested routes).
  const authRequired = to.matched.some(route => route.meta.authRequired);

  // If auth isn't required for the route, just continue.
  if (!authRequired) return next();

  // Otherwise let's validate the current user ...
  store.dispatch("auth/validateUser").then(validUser => {
    // Does the token still represents a valid user
    if (validUser) {
      // Are they still in the onboarding phase?
      // const userObj = store.state.auth.user;
      // if (userObj && userObj.__typename === "OnboardingAccount") {
      //   if (to.fullPath !== "/welcome") {
      //     next({ path: "/welcome" });
      //     return;
      //   }
      // }
      // yes, so off to the user profile
      next();
      return;
    } else {
      redirectToLogin();
    }
  });

  function redirectToLogin() {
    // Pass the original route to the login component
    next({ name: "page-login", query: { redirectFrom: to.fullPath } });
  }
});

export default router;
