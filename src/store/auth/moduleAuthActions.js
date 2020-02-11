/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
==========================================================================================*/

import Auth from "@aws-amplify/auth";
import { apolloClient } from "@/http/graphql";
import { GET_ACCOUNT } from "@/http/graphql/queries";

export default {
  /**
   * Clear the authentication status before
   * an auth related fn call.
   **/
  async signIn({ commit, state }, { username, password }) {
    commit("CLEAR_AUTHENTICATION_STATUS", null);
    try {
      const signedInUser = await Auth.signIn(username, password);
      // get account on sign in
      if (signedInUser && signedInUser.attributes.sub) {
        const response = await apolloClient.query({
          query: GET_ACCOUNT,
          variables: { id: signedInUser.attributes.sub }
        });
        console.log(response);
        const { getAccount } = response.data;
        commit("SET_USER_AUTHENTICATED", getAccount);
      }
      // If things go wrong, let's ensure we have
      // some basic user info on sign in ...
      if (Object.keys(state.user).length) {
        commit(
          "UPDATE_USER_INFO",
          {
            firstName: state.user.firstName,
            lastName: state.user.lastName
          },
          {
            root: true
          }
        );
      }
    } catch (err) {
      console.log("error: ", err);
      commit("SET_AUTHENTICATION_ERROR", err);
    }
  },

  /**
   * Sign the user out of the application.
   **/
  async signOut({ commit }) {
    try {
      await Auth.signOut();
    } catch (err) {
      console.error("error during sign out: {}", err);
    }
    commit("CLEAR_AUTHENTICATION", null);
  },

  /**
   * Register the user's basic information.
   * The next step is a verification code.
   **/
  async signUp({ commit }, params) {
    commit("CLEAR_AUTHENTICATION_STATUS", null);
    try {
      const auth = await Auth.signUp(params);
      commit("SET_USER_SIGNUP", auth.user);
    } catch (err) {
      commit("SET_AUTHENTICATION_ERROR", err);
    }
  },

  /**
   * Confirm the users email by sending
   * a confirmation code.
   **/
  async confirmSignUp({ commit }, { username, code, newUser }) {
    commit("CLEAR_AUTHENTICATION_STATUS", null);
    try {
      const signupStatus = await Auth.confirmSignUp(username, code);
      if (signupStatus === "SUCCESS") {
        commit("SET_USER_AUTHENTICATED", newUser);
      }
    } catch (err) {
      commit("SET_AUTHENTICATION_ERROR", err);
    }
  },

  /**
   * Resend the confirmation code to
   * the users email address.
   **/
  async confirmResend({ commit }, { username }) {
    commit("CLEAR_AUTHENTICATION_STATUS", null);
    try {
      await Auth.resendSignUp(username);
    } catch (err) {
      commit("SET_AUTHENTICATION_ERROR", err);
    }
  },

  /**
   * Reset the users password.
   **/
  async passwordReset({ commit }, { username }) {
    commit("CLEAR_AUTHENTICATION_STATUS", null);
    try {
      await Auth.forgotPassword(username);
    } catch (err) {
      commit("SET_AUTHENTICATION_ERROR", err);
    }
  },

  /**
   * Confirm password reset with a valid
   * confirmation code.
   **/
  async confirmPasswordReset({ commit }, { username, code, password }) {
    commit("CLEAR_AUTHENTICATION_STATUS", null);
    try {
      await Auth.forgotPasswordSubmit(username, code, password);
    } catch (err) {
      console.log("confirm pass err: ", err);
      commit("SET_AUTHENTICATION_ERROR", err);
    }
  },

  /**
   * Resend the users information for a
   * fresh password reset code.
   **/
  async passwordResetResend({ commit }, params) {
    commit("CLEAR_AUTHENTICATION_STATUS", null);
    try {
      await Auth.passwordResetResend(params.username);
    } catch (err) {
      commit("SET_AUTHENTICATION_ERROR", err, {
        root: true
      });
    }
  },

  /**
   * Physically change the users password.
   **/
  async passwordChange({ commit }, params) {
    commit("CLEAR_AUTHENTICATION_STATUS", null);
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(
        user,
        params.currentPassword,
        params.newPassword
      );
    } catch (err) {
      commit("SET_AUTHENTICATION_ERROR", err);
    }
  },

  /**
   * Validates the current user's token and refreshes it
   * with new data from the API.
   **/
  async validateUser({ commit, state }) {
    commit("CLEAR_AUTHENTICATION_STATUS", null);
    if (state.user && state.user.id) {
      commit("SET_USER_AUTHENTICATED", state.user);
      return state.user;
    }
    try {
      const currentUser = await Auth.currentUserInfo();
      if (currentUser && currentUser.attributes.sub) {
        const response = await apolloClient.query({
          query: GET_ACCOUNT,
          variables: { id: currentUser.attributes.sub }
        });
        console.log(response);
        const { getAccount } = response.data;
        commit("SET_USER_AUTHENTICATED", getAccount);
        commit("UPDATE_USER_INFO", getAccount, {
          root: true
        });
      }
      return currentUser;
    } catch (e) {
      commit("SET_AUTHENTICATION_ERROR", e);
    }
  },

  /**
   * Update a users details
   * @param {Object} payload
   */
  updateUserDetail({ commit }, payload) {
    commit("UPDATE_USER_DETAIL", payload);
  },


  /**
   * Update a care profile in a member account.
   * @param {Object} payload 
   */
  updateCareProfile ({ commit }, payload) {
    commit('UPDATE_CARE_PROFILE', payload)
  }
};
