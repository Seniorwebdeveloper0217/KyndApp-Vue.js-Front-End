/*=========================================================================================
  File Name: moduleSearch.js
  Description: Search Carers Module
==========================================================================================*/

import state from "./moduleSearchState";
import mutations from "./moduleSearchMutations";
import actions from "./moduleSearchActions";
import getters from "./moduleSearchGetters";

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
