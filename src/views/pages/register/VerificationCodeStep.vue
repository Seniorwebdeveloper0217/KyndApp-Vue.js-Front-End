<!-- =========================================================================================
File Name: VerificationCodeStep.vue
Description: Enter an AWS verification code.
========================================================================================== -->

<template>
  <article>
    <vs-input
      v-model.trim="confirmationCode"
      :success="isAuthenticated"
      success-text="The confirmation code is valid"
      val-icon-success="done"
      name="confirm-registration"
      icon-no-border
      icon="icon icon-lock"
      icon-pack="feather"
      label-placeholder="Confirmation Code"
      class="w-full vx-col mt-5"
    />
    <span
      v-if="!isAuthenticated && authenticationError"
      class="pl-4 pt-2 text-danger text-sm"
      v-text="authenticationError.message"
    />

    <div
      v-if="!isAuthenticated"
      class="flex justify-between"
    >
      <vs-button
        color="primary"
        type="border"
        icon-pack="feather"
        icon="icon-repeat"
        @click="goBack"
      />

      <vs-button
        color="warning"
        type="border"
        class="mb-2 ml-2"
        @click="confirmResend"
        v-text="'Resend Code'"
      />
      <vs-button
        class="ml-2 mb-2"
        @click="confirmSignUp"
        v-text="'Submit'"
      />
    </div>

    <transition name="fade">
      <div
        v-if="isAuthenticated"
        class="vx-col mt-5"
      >
        <h2 class="text-lg">
          Welcome to Kynd, {{ userDetails.formattedUserDetails.given_name }}!
        </h2>
        <p class="mt-2 text-lg">
          Let's get you set up.
        </p>
        <vs-button
          class="mr-3 mt-3"
          @click="gotoLogin"
          v-text="'Log In'"
        />
      </div>
    </transition>
  </article>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    userDetails: {
      type: Object,
      required: true,
      default: () => ({})
    },
    goBack: {
      type: Function,
      required: false,
      default: () => {
        return false;
      }
    }
  },
  data() {
    return {
      confirmationCode: ""
    };
  },
  computed: {
    ...mapGetters("auth", ["authenticationError", "isAuthenticated"])
  },
  methods: {
    gotoLogin() {
      // reset auth status so we get a fresh login JWT
      this.$store.commit("auth/SET_USER_AUTHENTICATED", null);
      this.$router.push("/login");
    },
    async confirmResend() {
      await this.$store.dispatch("auth/confirmResend", {
        username: this.userDetails.username
      });
    },
    async confirmSignUp() {
      await this.$store.dispatch("auth/confirmSignUp", {
        username: this.userDetails.username,
        code: this.confirmationCode,
        newUser: this.userDetails.formattedUserDetails
      });
    }
  }
};
</script>
