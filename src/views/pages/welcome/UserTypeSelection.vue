<template>
  <section>
    <h1 class="text-center pt-10 md:pt-24">
      Welcome to Kynd
    </h1>
    <h2 class="text-center leading-loose">
      Please make a selection below:
    </h2>
    <section class="flex flex-col md:flex-row justify-center items-center h-full pt-6">
      <article
        style="background: #efc301"
        class="cursor-pointer text-center hover:shadow-md p-6 m-4 max-w-sm"
        @click="updateUserType('member')"
      >
        <div id="member">
          <feather-icon
            icon="UsersIcon"
            svg-classes="h-24 w-24"
            class="ml-1"
          />
          <h2>I'm a Member</h2>
          <vs-divider />
          <p class="text-xl text-black">
            I'm looking for help from a support pro
            either for myself or someone I know.
          </p>
        </div>
      </article>
      <article
        style="background: #00c971"
        class="cursor-pointer text-center hover:shadow-md p-6 m-4 max-w-sm"
        @click="updateUserType('support-pro')"
      >
        <div id="support-pro">
          <feather-icon
            icon="UserCheckIcon"
            svg-classes="h-24 w-24"
            class="ml-1"
          />
          <h2>I'm a Support Pro</h2>
          <vs-divider />
          <p class="text-xl text-black">
            I'm looking to help people in my local
            community with extra support or care.
          </p>
        </div>
      </article>
    </section>
  </section>
</template>

<script>

export default {
  methods: {
    updateUserType(type) {
      
      this.$router.push({
        name: `onboarding-${type}`
      });

    }
  }
};
</script>
