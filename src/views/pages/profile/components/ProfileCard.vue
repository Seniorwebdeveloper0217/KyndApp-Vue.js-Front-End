<!-- =========================================================================================
  File Name: ProfileCard.vue
  Description: Profile Card for various profile pages
========================================================================================== -->

<template>
  <vx-card class="relative pt-2 pr-2">
    <span class="absolute right-0 top-0">
      <feather-icon
        icon="EditIcon"
        class="p-3 inline-flex rounded-full feather-icon text-primary m-2 editIconBg"
        @click="openAlert('primary')"
      />
    </span>
    <article class="flex lg:pr-6">
      <div class="hidden lg:w-1/5 lg:block">
        <img
          class="rounded-full shadow-md responsive rounded-lg w-full mb-6"
          :src="profile.avatarImg"
          :alt="`Profile Image of ${profile.firstName}`"
        >
      </div>
      <section class="flex justify-between flex-wrap xs:w-full xs:m-auto lg:w-4/5 lg:pl-10">
        <div class="w-full">
          <section class="flex flex-col items-center m-auto lg:m-0 lg:justify-between lg:flex-row">
            <img
              class="rounded-full shadow-md responsive rounded-lg w-48 mb-6 xs:block lg:hidden"
              :src="profile.avatarImg"
              :alt="`Profile Image of ${profile.firstName}`"
            >

            <section class="max-w-200">
              <h2
                class="mb-2"
                v-text="`${profile.firstName} ${profile.lastName}`"
              />
              <p
                class="text-grey-500 text-lg"
                v-text="profile.type"
              />
            </section>
            <section class="sm:flex lg:pr-2">
              <div
                v-for="badge in profile.badges"
                :key="badge.type"
                class="flex items-center mx-5 my-2"
              >
                <feather-icon
                  :icon="badge.icon"
                  svg-classes="h-5 w-5 text-primary stroke-current"
                />
                <span
                  class="ml-2"
                  v-text="badge.title"
                />
              </div>
            </section>
          </section>
          <vs-divider />
          <h3 class="font-bold">
            Profile Description
          </h3>
          <p v-text="profile.description" />
        </div>
      </section>
    </article>
  </vx-card>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      required: true,
      default: () => ({
        avatarImg: "https://image.flaticon.com/icons/svg/147/147144.svg",
        firstName: "Jack",
        lastName: "Tester",
        type: "Member Carer",
        description: `I'm a stay at home dad who cares for three boys. Here is some more information about me so please read this. Here is some more information about me so please read this. Here is some more information about me so please read this. Here is some more information about me so please read this. I need help seven days a week from 9am to 10pm.`,
        badges: [
          {
            type: "profiles",
            title: "2 profiles",
            icon: "SmileIcon"
          },
          {
            type: "bookings",
            title: "24 Bookings",
            icon: "CalendarIcon"
          },
          {
            type: "address",
            title: "23 Currumbin Way, Currumbin Valley, 4223",
            icon: "MapPinIcon"
          }
        ]
      })
    }
  },
  data() {
    return {
      card_2: null,
      card_4: null,
      colorAlert: "primary",
      titleAlert: "Alert",
      activeAlert: false
    };
  },
  created() {
    // Card 2
    this.$http
      .get("/api/users/pixinvent/product/sales/1")
      .then(response => {
        this.card_2 = response.data;
      })
      .catch(error => {
        console.log(error);
      });

    // Card 4
    this.$http
      .get("/api/users/89")
      .then(response => {
        this.card_4 = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    openAlert(color) {
      this.colorAlert = color;
      this.$vs.dialog({
        color: this.colorAlert,
        title: `Dialog - ${this.colorAlert}`,
        text:
          "I love soufflé lollipop liquorice wafer jelly-o halvah sesame snaps. Pastry chocolate cake jelly-o carrot cake jelly topping croissant ice cream.",
        accept: this.acceptAlert
      });
    }
  }
};
</script>

<style lang="scss">
.editIconBg {
  background: rgba(var(--vs-primary), 0.15);

  &:hover {
    background: rgba(var(--vs-primary), 0.25);
    cursor: pointer;
    transition: 0.2 s ease;
  }
}
</style>
