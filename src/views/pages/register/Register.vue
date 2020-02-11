<!-- =========================================================================================
    File Name: Register.vue
    Description: Register Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-4/5 sm:m-0 m-4">
      <vx-card>
        <div
          slot="no-body"
          class="full-page-bg-color"
        >
          <div class="vx-row no-gutter">
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img
                src="@/assets/images/pages/register.jpg"
                alt="register"
                class="mx-auto"
              >
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
              <div class="px-8 pt-8 register-tabs-container">
                <vs-tabs>
                  <vs-tab label="AWS">
                    <register-aws />
                  </vs-tab>
                </vs-tabs>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import RegisterAws from "./RegisterAWS.vue";

export default {
  components: {
    RegisterAws
  }
};
</script>

<style lang="scss">
.register-tabs-container {
  min-height: 517px;

  .con-tab {
    padding-bottom: 23px;
  }

  .con-ul-tabs {
    display: none;
  }
}
</style>
