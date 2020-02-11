/*=========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
==========================================================================================*/

export default {
  SET_AUTHENTICATION_ERROR(state, err) {
    state.authenticationError = {
      state: "failed",
      message: err.message,
      variant: "danger"
    };
  },

  CLEAR_AUTHENTICATION_STATUS(state) {
    state.authenticationError = null;
  },

  SET_USER_SIGNUP(state, userObject) {
    state.user = userObject;
    state.isAuthenticated = false;
  },

  SET_USER_AUTHENTICATED(state, user) {
    state.user = user;
    state.isAuthenticated = true;
  },

  CLEAR_AUTHENTICATION(state) {
    state.user = null;
    state.userId = null;
    state.isAuthenticated = false;
  },

  UPDATE_USER_DETAIL(state, payload) {
    state.user = {
      ...state.user,
      ...payload
    }
  },

  UPDATE_CARE_PROFILE(state, payload) {
    let { profileIndex, profile } = payload
    state.user.careProfiles[profileIndex] = profile

    state.user = {
      ...state.user
    }
  }
};
