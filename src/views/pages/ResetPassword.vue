<!-- =========================================================================================
    File Name: ResetPassword.vue
    Description: Reset Password Page
========================================================================================== -->

<template>
  <div class="h-screen flex w-full bg-img">
    <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <vx-card>
        <div
          slot="no-body"
          class="full-page-bg-color"
        >
          <div class="vx-row">
            <div
              class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center"
            >
              <img
                src="@/assets/images/pages/reset-password.png"
                alt="login"
                class="mx-auto"
              >
            </div>
            <div
              class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg"
            >
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">
                    Reset Password
                  </h4>
                  <p>Please enter your new password.</p>
                </div>
                <vs-input
                  v-model="value1"
                  type="email"
                  label-placeholder="Email"
                  class="w-full mb-6"
                />
                <vs-input
                  v-model="value2"
                  type="password"
                  label-placeholder="Password"
                  class="w-full mb-6"
                />
                <vs-input
                  v-model="value3"
                  type="password"
                  label-placeholder="Confirm Password"
                  class="w-full mb-8"
                />

                <div
                  class="flex flex-wrap justify-between flex-col-reverse sm:flex-row"
                >
                  <vs-button
                    type="border"
                    to="/login"
                    class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto"
                    v-text="'Go Back To Login'"
                  />
                  <vs-button class="w-full sm:w-auto">
                    Reset
                  </vs-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      value3: ""
    };
  }
};
</script>
