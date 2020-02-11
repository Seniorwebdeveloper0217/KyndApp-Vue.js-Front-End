<template>
  <form class="flex justify-center flex-col md:flex-row">
    <div class="vx-row">
      <div class="vx-col mt-5 mr-10">
        <upload-photo :include-label="true" />
      </div>
    </div>

    <section class="vx-row max-w-sm">
      <!-- First Name -->
      <div class="vx-col w-full mt-5">
        <validation-provider
          v-slot="{ errors }"
          rules="required"
        >
          <vs-input
            v-model="firstName"
            label="First Name"
            class="w-full"
          />
          <span class="text-danger text-sm">{{ errors[0] }}</span>
        </validation-provider>
      </div>
      
      <!-- Last Name -->
      <div class="vx-col w-full mt-5">
        <validation-provider
          v-slot="{ errors }"
          rules="required"
        >
          <vs-input
            v-model="lastName"
            label="Last Name"
            class="w-full"
          />
          <span class="text-danger text-sm">{{ errors[0] }}</span>
        </validation-provider>
      </div>

      <!-- Phone Number -->
      <div class="vx-col w-full mt-5">
        <validation-provider
          v-slot="{ errors }"
          :rules="{ required: true, mobileNo: /^04[0-9]{8}$/ }"
        >
          <vs-input
            v-model="phoneNumber"
            type="tel"
            label="Mobile Number"
            class="w-full"
            required
          />
          <span class="text-danger text-sm">{{ errors[0] }}</span>
        </validation-provider>
      </div>
    </section>
  </form>
</template>

<script>
import { mapState } from "vuex";
import UploadPhoto from "@/components/profile/UploadPhoto";
import { ValidationProvider } from "vee-validate";
import ValidationRules from "@/helpers/validation";
// Install rules from vee-validate
ValidationRules();


export default {
  components: {
    UploadPhoto,
    ValidationProvider
  },
  computed: {
    ...mapState("auth", ["user"]),
    firstName: {
      set (firstName) {
        this.$store.dispatch('auth/updateUserDetail', { firstName })
      },
      get () {
        return this.user.firstName
      }
    },
    lastName: {
      set (lastName) {
        this.$store.dispatch('auth/updateUserDetail', { lastName })
      },
      get () {
        return this.user.lastName
      }
    },
    phoneNumber: {
      set (phoneNumber) {
        this.$store.dispatch('auth/updateUserDetail', { phoneNumber })
      },
      get () {
        return this.user.phoneNumber
      }
    }
  }
};
</script>
