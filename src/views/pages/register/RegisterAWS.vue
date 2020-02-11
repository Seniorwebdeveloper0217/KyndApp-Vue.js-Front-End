<!-- =========================================================================================
File Name: RegisterAWS.vue
Description: Register Page for AWS
========================================================================================== -->

<template>
  <section class="clearfix">
    <!-- 
      ===========================
      REGISTRATION HEADING 
      =========================== 
    -->
    <article class="registation-heading">
      <div
        v-if="!confirmRegistrationStep"
        class="vx-card__title mb-4"
      >
        <h4 class="mb-4">
          Create Account
        </h4>
        <p>Fill the below form to create a new account.</p>
      </div>
      <div
        v-else
        class="vx-card__title mb-4"
      >
        <h4 class="mb-4">
          Enter Your Confirmation Code
        </h4>
        <p>Please check your email for a verification code.</p>
      </div>
    </article>

    <!-- 
      ===========================
      CONFIRM REGISTRATION STEP 
      =========================== 
    -->
    <article
      v-if="confirmRegistrationStep"
      class="pb-6"
    >
      <verification-code-step
        :go-back="
          () => {
            confirmRegistrationStep = false;
          }
        "
        :user-details="{
          username: email,
          formattedUserDetails: { ...formattedUserDetails }
        }"
      />
    </article>

    <!-- 
      ===========================
      REGISTRATION FIELDS 
      =========================== 
    -->
    <article
      v-else
      class="pb-6 registration-fields"
    >
      <validation-observer v-slot="{ invalid }">
        <div class="vx-row flex">
          <!-- First Name -->
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            class="vx-col md:w-1/2 w-full"
          >
            <vs-input
              v-model="firstName"
              label-placeholder="First Name"
              name="first-name"
              placeholder="First Name"
              class="w-full"
            />
            <span class="text-danger text-sm">{{ errors[0] }}</span>
          </validation-provider>

          <!-- Last Name -->
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            class="vx-col md:w-1/2 w-full"
          >
            <vs-input
              v-model="lastName"
              label-placeholder="Last Name"
              name="last-name"
              placeholder="Last Name"
              class="w-full"
              required
            />
            <span class="text-danger text-sm">{{ errors[0] }}</span>
          </validation-provider>
        </div>

        <!-- Email Address -->
        <validation-provider
          v-slot="{ errors }"
          rules="required|email"
        >
          <vs-input
            v-model="email"
            name="email"
            type="email"
            label-placeholder="Email"
            placeholder="Email"
            class="w-full mt-6"
          />
          <span class="text-danger text-sm">{{ errors[0] }}</span>
        </validation-provider>

        <!-- Password -->
        <validation-provider
          v-slot="{ errors }"
          vid="confirmation"
          rules="required|minPassword:6"
        >
          <vs-input
            ref="password"
            v-model="password"
            type="password"
            name="password"
            label-placeholder="Password"
            placeholder="Password"
            class="w-full mt-6"
          />
          <span class="text-danger text-sm">{{ errors[0] }}</span>
        </validation-provider>

        <!-- Confirm -->
        <validation-provider
          v-slot="{ errors }"
          rules="required|minPassword:6|confirmed:confirmation"
        >
          <vs-input
            v-model="confirmPassword"
            type="password"
            name="confirmPassword"
            label-placeholder="Confirm Password"
            placeholder="Confirm Password"
            class="w-full mt-6"
          />
          <span class="text-danger text-sm">{{ errors[0] }}</span>
        </validation-provider>

        <!-- Postcode -->
        <validation-provider
          v-slot="{ errors }"
          rules="required|postCode:4"
        >
          <vs-input
            v-model="postCode"
            name="postCode"
            type="text"
            label-placeholder="Postcode"
            placeholder="Postcode"
            class="vx-col md:w-1/2 w-full mt-6"
          />
          <span class="text-danger text-sm">{{ errors[0] }}</span>
        </validation-provider>

        <!-- Terms & Conditions -->
        <vs-checkbox
          v-model="isTermsConditionAccepted"
          class="mt-6"
        >
          I accept the terms & conditions.
        </vs-checkbox>

        <!-- Login Button -->
        <vs-button
          type="border"
          to="/login"
          class="mt-6"
          v-text="'Login'"
        />

        <!-- Register -->
        <vs-button
          class="float-right mt-6"
          :disabled="invalid"
          @click="authenticateUser"
          v-text="'Register'"
        />

        <div
          v-if="authenticationError.message"
          class="text-center mt-4"
        >
          <vs-alert
            color="danger"
            active="true"
          >
            {{ authenticationError.message }}
          </vs-alert>
        </div>
      </validation-observer>
    </article>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import VerificationCodeStep from "./VerificationCodeStep.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import ValidationRules from "@/helpers/validation";
// Install auth rules from vee-validate
ValidationRules();

export default {
  components: {
    VerificationCodeStep,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      postCode: "",
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      isTermsConditionAccepted: true,
      confirmRegistrationStep: false
    };
  },
  computed: {
    ...mapGetters("auth", ["authenticationError", "isAuthenticated"]),
    formattedUserDetails() {
      return {
        given_name: this.firstName,
        family_name: this.lastName,
        email: this.email,
        address: this.postCode
        // phone_number: this.phoneNumber
      };
    }
  },
  methods: {
    async authenticateUser() {
      await this.$store.dispatch("auth/signUp", {
        username: this.email,
        password: this.password,
        attributes: this.formattedUserDetails
      });

      if (!this.authenticationError.message) {
        this.confirmRegistrationStep = true;
      }
    }
  }
};
</script>
