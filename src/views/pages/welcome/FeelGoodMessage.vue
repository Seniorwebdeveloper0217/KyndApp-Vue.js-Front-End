<template>
  <section class="flex flex-col md:flex-row pt-10">
    <div class="w-full lg:w-1/2 pr-4 order-last md:order-first">
      <h1 class="font-bold leading-normal">
        Ready to start your Kynd journey?
      </h1>
      <h2 class="py-2 lg:p-0">
        Here’s the breakdown:
      </h2>

      <vs-list class="kynd-breakdown-list">
        <!-- <vs-list-header icon-pack="feather" icon="icon-users" title="Group 1"></vs-list-header> -->
        <vs-list-item
          icon-pack="feather"
          icon="icon-book"
          title="Custom Text based on Selection"
          subtitle="A member is someone who is looking for care for themselves or someone they know. A carer is someone able to support members with their specific needs."
        />
        <vs-list-item
          icon-pack="feather"
          icon="icon-file-text"
          title="Custom Text based on Selection"
          subtitle="Add your profile picture, description, and professional information. "
        />
        <vs-list-item
          icon-pack="feather"
          icon="icon-search"
          title="Start searching for jobs and / or carers"
          subtitle="Search to find the right match for you. "
        />
      </vs-list>

      <vs-button
        color="primary"
        class="mt-4"
        @click="gotoWizard"
        v-text="'Click here to begin!'"
      />
    </div>

    <div class="w-full lg:w-1/2 py-6">
      <responsive-you-tube video-embed-id="Bey4XXJAqS8" />
    </div>
  </section>
</template>

<script>
import ResponsiveYouTube from "@/components/video/ResponsiveYouTube";

export default {
  components: {
    ResponsiveYouTube
  },
  props: {
    userType: {
      type: String,
      required: true,
      default: "member"
    }
  },
  methods: {
    gotoWizard() {
      this.$router.push({
        name: `wizard-${this.userType}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .kynd-breakdown-list {
  .vs-list--item {
    margin: 1rem 0;

    .vs-list--title {
      font-size: 1.2rem;
    }

    .vs-list--subtitle {
      font-size: 1rem;
    }
  }
}
</style>
