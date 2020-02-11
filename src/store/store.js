/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// import moduleCalendar from './calendar/moduleCalendar.js'
// import moduleChat from './chat/moduleChat.js'
import moduleAuth from "./auth/moduleAuth";
import moduleSearch from "./search/moduleSearch";
import moduleApp from "./app/moduleApp";

export default new Vuex.Store({
  modules: {
    // calendar: moduleCalendar,
    // chat: moduleChat,
    app: moduleApp,
    auth: moduleAuth,
    search: moduleSearch
  },
  strict: process.env.NODE_ENV !== "production"
});
