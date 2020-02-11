<!-- =========================================================================================
    File Name: ForgotPassword.vue
    Description: Forgot Password Page
========================================================================================== -->

<template>
  <article class="h-screen flex w-full bg-img">
    <div class="vx-col w-4/5 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <vx-card>
        <div
          slot="no-body"
          class="full-page-bg-color"
        >
          <section class="vx-row">
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img
                src="@/assets/images/pages/forgot-password.png"
                alt="login"
                class="mx-auto"
              >
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">
                    Recover your password
                  </h4>
                  <p>
                    Please enter your email address and we'll send you a
                    confirmation code.
                  </p>
                </div>

                <!-- 
                ===========================
                CONFIRM PASSWORD RESET
                =========================== 
                -->
                <section
                  v-if="codeSentWithoutErrors"
                  class="mb-8"
                >
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
                    class="w-full"
                  />
                  <vs-input
                    v-model="newPassword"
                    type="password"
                    name="new-password"
                    icon-no-border
                    icon="icon icon-lock"
                    icon-pack="feather"
                    label-placeholder="New Password"
                    class="w-full"
                  />
                </section>

                <!-- 
                ===========================
                INITIAL PASSWORD RESET
                =========================== 
                -->
                <section
                  v-else
                  class="mb-8"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    rules="email|required|min:6"
                  >
                    <vs-input
                      v-model.lazy="email"
                      type="email"
                      label-placeholder="Email"
                      class="w-full"
                    />
                    <span class="text-danger text-sm">{{ errors[0] }}</span>
                  </validation-provider>
                </section>

                <vs-button
                  type="border"
                  to="/login"
                  class="px-4 w-full md:w-auto"
                  v-text="'Back To Login'"
                />
                <vs-button
                  v-if="!codeSentWithoutErrors"
                  class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0"
                  :disabled="!/\S+@\S+\.\S+/.test(email)"
                  @click="passwordReset"
                  v-text="'Recover Password'"
                />

                <vs-button
                  v-if="codeSentWithoutErrors"
                  :disabled="password.length < 6"
                  class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0"
                  @click="confirmPasswordReset"
                  v-text="'Submit Code'"
                />
              </div>
              <article class="text-center pb-8">
                <vs-alert
                  v-if="resetSuccess"
                  color="danger"
                  active="true"
                >
                  Your password has been reset!
                </vs-alert>
                <vs-alert
                  v-if="authenticationError.message"
                  color="danger"
                  active="true"
                >
                  {{ authenticationError.message }}
                </vs-alert>
              </article>
            </div>
          </section>
        </div>
      </vx-card>
    </div>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import { ValidationProvider } from "vee-validate";
import ValidationRules from "@/helpers/validation";
// Install rules from vee-validate
ValidationRules();

export default {
  components: {
    ValidationProvider
  },
  data() {
    return {
      email: "",
      codeSent: false,
      confirmationCode: "",
      newPassword: "",
      resetSuccess: false
    };
  },
  computed: {
    ...mapGetters("auth", ["authenticationError", "isAuthenticated"]),
    codeSentWithoutErrors() {
      return this.codeSent && !this.authenticationError.message;
    }
  },
  methods: {
    async passwordReset() {
      this.codeSent = true;
      await this.$store.dispatch("auth/passwordReset", {
        username: this.email
      });
    },
    async confirmPasswordReset() {
      this.resetSuccess = false;
      await this.$store.dispatch("auth/confirmPasswordReset", {
        username: this.email,
        code: this.confirmationCode,
        password: this.newPassword
      });
      if (!this.authenticationError.message) {
        this.resetSuccess = true;
        setTimeout(() => {
          this.$router.push("/login");
        }, 500);
      }
    }
  }
};
</script>
