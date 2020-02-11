/*=========================================================================================
  File Name: moduleApp.js
  Description: Main App State Module
==========================================================================================*/

import state from "./moduleAppState";
import mutations from "./moduleAppMutations";
import actions from "./moduleAppActions";
import getters from "./moduleAppGetters";

export default {
  // namespaced: true,
  state,
  mutations,
  actions,
  getters
};
