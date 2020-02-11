<template>
  <section>
    <article class="flex flex-col justify-center md:flex-row mt-6">
      <section class="vx-row w-full lg:w-1/2 ml-0">
        <!-- Photo Upload -->
        <upload-photo class="mr-4" />

        <!-- Hourly Pay Rate -->
        <div class="flex flex-col">
          <validation-provider
            v-slot="{ errors }"
            rules="required|numeric"
          >
            <label class="block vs-input--label mt-4 sm:mt-0">
              Hourly Pay Rate
              <vs-input
                v-model="payRate"
                icon-pack="feather"
                icon="icon-dollar-sign"
                placeholder="Hourly Pay Rate"
                class="mt-1"
                icon-before
              />
            </label>

            <span class="text-danger text-sm">{{ errors[0] }}</span>
          </validation-provider>
          <label class="block vs-input--label block mt-4">
            Public Profile
            <vs-switch v-model="profileIsVisible" />
          </label>
        </div>
      </section>
        
      <!-- Services List -->
      <section class="w-full md:w-1/2 mt-5 md:mt-0 flex flex-col justify-center">
        <div class="vx-col w-full">
          <span class="block vs-input--span">Which services can you offer?</span>
          <div class="flex flex-col flex-wrap max-h-250">
            <label
              v-for="service in availableSupportServices"
              :key="service"
              class="vs-input--label my-2"
            >
              {{ readableString(service) }}
              <vs-switch
                v-model="selectedServices"
                :vs-value="service"
              />
            </label>
            <div
              v-if="error"
              class="text-danger text-sm"
            >
              {{ error }}
            </div>
          </div>
        </div>
      </section>
    </article>

    <!-- About Textarea -->
    <div class="vx-col w-full my-4">
      <span class="block vs-input--span">Tell us a bit about yourself</span>
      <vs-textarea
        v-model="profileDescription"
        class="mt-2"
        height="200"
      />
    </div>
  </section>
</template>

<script>
import UploadPhoto from "@/components/profile/UploadPhoto";
import { ValidationProvider } from "vee-validate";
import { SUPPORT_SERVICES_ENUMS } from "@/http/graphql/queries";
import ValidationRules from "@/helpers/validation";
// Install rules from vee-validate
ValidationRules();

export default {
  components: {
    UploadPhoto,
    ValidationProvider
  },
  data() {
    return {
      payRate: "50",
      lastName: "Doe",
      phoneNumber: "",
      profileDescription: "",
      profileIsVisible: true,
      selectedServices: [],
      error: null
    };
  },
  apollo: {
    supportServiceList: {
      query: SUPPORT_SERVICES_ENUMS,
      error(error) {
       this.error = error.message
     }
    }
  },

  computed: {
    availableSupportServices() {
      if (this.supportServiceList) {
        return this.supportServiceList.enumValues.map(s => s.name);
      }
      return [];
    },
    readableString() {
      return function(str) {
        return str.match(/[A-Z][a-z]+/g).join(" ");
      };
    }
  }
};
</script>
