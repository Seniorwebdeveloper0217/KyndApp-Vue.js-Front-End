<template>
  <validation-observer v-slot="{ invalid }">
    <form>
      <validation-provider
        v-slot="{ errors }"
        rules="required|email|min:3"
      >
        <vs-input
          v-model.trim="email"
          required
          name="email"
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Email"
          class="w-full"
        />
        <span class="text-danger text-sm">{{ errors[0] }}</span>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        rules="minPassword:6"
      >
        <vs-input
          v-model="password"
          required
          type="password"
          name="password"
          icon-no-border
          icon="icon icon-lock"
          icon-pack="feather"
          label-placeholder="Password"
          class="w-full mt-6"
        />
        <span class="text-danger text-sm">{{ errors[0] }}</span>
      </validation-provider>

      <div class="flex flex-wrap justify-between my-5">
        <vs-checkbox
          v-model="checkbox_remember_me"
          class="mb-3"
        >
          Remember me.
        </vs-checkbox>
        <router-link
          to="/forgot-password"
          v-text="'Forgot Password?'"
        />
      </div>
      
      <div class="flex flex-wrap justify-between mb-3">
        <vs-button
          type="border"
          @click="registerUser"
          v-text="'Register'"
        />
        <button
          type="submit"
          style="background: transparent; border: none;"
          @click.prevent="signIn"
        >
          <vs-button
            :disabled="invalid"
            v-text="'Login'"
          />
        </button>
      </div>
    </form>

    <!-- Alert Messages -->
    <article class="text-center mt-4">
      <vs-alert
        v-if="loginRequestSent"
        color="primary"
        active="true"
      >
        Please wait ...
      </vs-alert>
      <vs-alert
        v-if="authenticatedUser"
        color="success"
        active="true"
      >
        Welcome to Kynd!
      </vs-alert>
      <vs-alert
        v-else-if="authenticationError.message"
        color="danger"
        active="true"
      >
        {{ authenticationError.message }}
      </vs-alert>
    </article>
  </validation-observer>
</template>

<script>
import { mapGetters } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import ValidationRules from "@/helpers/validation";
// Install from vee-validate
ValidationRules();

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      email: "jack@kynd.care",
      password: "HelloWorld123!",
      checkbox_remember_me: false,
      loginRequestSent: false
    };
  },
  computed: {
    ...mapGetters("auth", ["authenticationError", "authenticatedUser"])
  },
  methods: {
    registerUser() {
      this.$store.commit("auth/CLEAR_AUTHENTICATION_STATUS", null);
      this.$router.push("/register");
    },
    async signIn() {
      this.loginRequestSent = true;
      await this.$store.dispatch("auth/signIn", {
        username: this.email,
        password: this.password
      });
      this.loginRequestSent = false;

      // Check if the user is in the "onboarding" stage
      const userOnboarding =
        this.authenticatedUser && this.authenticatedUser.__typename === "OnboardingAccount" 

      this.$router.push(
        this.$route.query.redirectFrom || {
          name: userOnboarding ? "page-welcome" : "page-profile"
        }
      );
    }
  }
};
</script>
