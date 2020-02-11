<template>
  <section>
    <vs-alert
      :active.sync="alertMsgIsActive"
      icon-pack="feather"
      close-icon="icon-x"
      :closable="true"
    >
      Before beginning this step it is recommended that
      you get all your NDIS paperwork in order so you
      can easily enter the required payment information.
    </vs-alert>

    <!-- <p class="text-xl text-center pb-10">Click the box below to add a user profile</p> -->
    <div class="vx-row flex justify-center">
      <add-profile-box
        v-for="profile in profiles"
        :key="'profile__' + profile"
        :profile-added="profileAdded"
        icon="DollarSignIcon"
        box-text="Add Payment Info"
      >
        <template v-slot:dialog-form>
          <payment-info-card />
        </template>
      </add-profile-box>
    </div>
  </section>
</template>

<script>
import PaymentInfoCard from "@/components/profile/PaymentInfoCard";
import AddProfileBox from "@/components/profile/AddProfileBox";

export default {
  components: {
    PaymentInfoCard,
    AddProfileBox
  },
  data() {
    return {
      profiles: 1,
      alertMsgIsActive: true,
      statusOptions: [
        { text: "Plannning", value: "plannning" },
        { text: "In Progress", value: "in progress" },
        { text: "Finished", value: "finished" }
      ],

      LocationOptions: [
        { text: "New York", value: "new-york" },
        { text: "Chicago", value: "chicago" },

        { text: "San Francisco", value: "san-francisco" },
        { text: "Boston", value: "boston" }
      ],
      cityOptions: [
        { text: "New York", value: "new-york" },
        { text: "Chicago", value: "chicago" },
        { text: "San Francisco", value: "san-francisco" },
        { text: "Boston", value: "boston" }
      ],
      eventName: "",
      eventLocation: "san-francisco",
      status: "plannning"
    };
  },
  methods: {
    profileAdded() {
      this.profiles++;
    }
  }
};
</script>

<style>
</style>
