/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
==========================================================================================*/
import store from "@/store/store";

const navMenuItems = [
  {
    url: null,
    name: "Dashboard",
    tagColor: "warning",
    icon: "HomeIcon",
    submenu: [
      {
        url: "/dashboard/analytics",
        name: "Admin ONLY",
        slug: "dashboard-analytics"
      }
    ]
  },
  {
    header: "Apps",
    icon: "PackageIcon",
    items: [
      {
        url: "/apps/chat",
        name: "Chat",
        slug: "chat",
        icon: "MessageSquareIcon"
      },
      {
        url: "/apps/calendar/vue-simple-calendar",
        name: "Calendar",
        slug: "calendar-simple-calendar",
        icon: "CalendarIcon",
        tagColor: "success"
      },
      {
        url: null,
        name: "Search Carers",
        icon: "SearchIcon",
        submenu: [
          {
            url: "/apps/search/shop",
            name: "Search Carers",
            slug: "ecommerce-shop"
          },
          {
            url: "/apps/search/wish-list",
            name: "Saved Carers",
            slug: "ecommerce-wish-list"
          },
          {
            url: "/apps/search/checkout",
            name: "Checkout",
            slug: "ecommerce-checkout"
          }
        ]
      }
    ]
  },
  {
    header: "UI",
    icon: "LayersIcon",
    items: [
      {
        url: null,
        name: "Extensions",
        icon: "PlusCircleIcon",
        submenu: [
          {
            url: "/extensions/access-control",
            name: "Access Control",
            slug: "extra-component-access-control"
          }
        ]
      }
    ]
  },
  {
    header: "Pages",
    icon: "FileIcon",
    items: [
      {
        url: "/profile",
        slug: "page-profile",
        name: "Profile",
        icon: "UserIcon",
        submenu: [
          {
            url: "/profile",
            name: "General Info",
            slug: "pages-profile-general-info"
          },
          {
            url: "/profile/bookings",
            name: "Bookings",
            slug: "pages-profile-bookings"
          },
          {
            url: "/profile/profiles",
            name: "Profiles",
            slug: "pages-profile-profiles"
          },
          {
            url: "/profile/billing",
            name: "Billing Info",
            slug: "pages-profile-billing"
          },
          {
            url: "/profile/settings",
            name: "Settings",
            slug: "pages-profile-settings"
          }
        ]
      },
      {
        url: null,
        name: "Authentication",
        icon: "PieChartIcon",
        submenu: [
          {
            url: "/login",
            name: "Login",
            slug: "pages-login",
            target: "_blank"
          },
          {
            url: "/register",
            name: "Register",
            slug: "pages-register",
            target: "_blank"
          },
          {
            url: "/forgot-password",
            name: "Forgot Password",
            slug: "pages-forgot-password",
            target: "_blank"
          },
          {
            url: "/reset-password",
            name: "Reset Password",
            slug: "pages-reset-password",
            target: "_blank"
          },
          {
            url: "/lock-screen",
            name: "Lock Screen",
            slug: "pages-lock-screen",
            target: "_blank"
          }
        ]
      }
    ]
  }
];

// TODO: Check if the user is still doing the Wizard ...
/* eslint-disable */
const user = store.getters["auth/authenticatedUser"];

console.log("nav menu items: ", { user });
const onboarding = {
  header: "Welcome",
  items: [
    {
      name: "Welcome to Kynd",
      icon: "InfoIcon",
      url: "/welcome",
      slug: "pages-welcome"
    }
  ]
};

export default [
  ...navMenuItems,
  user.onboardingCompletedAt === null && onboarding
];
