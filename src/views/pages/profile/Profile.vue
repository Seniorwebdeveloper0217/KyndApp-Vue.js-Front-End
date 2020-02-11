<!-- =========================================================================================
  File Name: Profile.vue
  Description: Profile Page
========================================================================================== -->

<template>
  <div id="profile-page">
    <!-- COL AREA -->
    <div class="vx-row mx-2 my-6">
      <div class="w-full">
        <h3 class="my-2">
          You've completed 40% of your profile!
        </h3>
        <vs-progress
          :height="12"
          :percent="40"
          color="success"
        />
      </div>
    </div>

    <div class="vx-row">
      <!-- COL 1 -->
      <div class="vx-col w-full">
        <div class="vx-col w-full mb-base">
          <profile-card />
        </div>
      </div>

      <!-- COL 2/3 -->
      <div class="vx-col w-full">
        <!-- <vx-card title="Some other card">
          <h2>profile info here</h2>
        </vx-card>-->
      </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from "./components/ProfileCard";

export default {
  components: {
    ProfileCard
  }
};
</script>
