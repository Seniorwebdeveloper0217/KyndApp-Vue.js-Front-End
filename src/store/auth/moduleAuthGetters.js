/*=========================================================================================
  File Name: moduleAuthGetters.js
  Description: Auth Module Getters
==========================================================================================*/

export default {
  authenticatedUser: state => state.user,
  isAuthenticated: state => state.isAuthenticated,
  authenticationError: state => {
    if (state.authenticationError) {
      return state.authenticationError;
    } else {
      return { variant: "secondary" };
    }
  },
  hasAuthenticationError: state => {
    return !!state.authenticationError;
  }
};
