<template>
  <article class="m-4">
    <section class="vx-row">
      <div class="vx-col w-full md:w-1/2">
        <validation-provider
          v-slot="{ errors }"
          rules="required"
        >
          <vs-input
            v-model="participantNo"
            type="tel"
            label="Participant Number"
            class="w-full"
            required
          />
          <span class="text-danger text-sm">{{ errors[0] }}</span>
        </validation-provider>
      </div>

      <div class="vx-col w-full md:w-1/2">
        <validation-provider
          v-slot="{ errors }"
          rules="required"
        >
          <label>
            <span class="block vs-input--label">How is you plan managed?</span>
            <vs-radio
              v-model="planType"
              class="m-2"
              vs-value="Self Managed"
            >Self</vs-radio>
            <vs-radio
              v-model="planType"
              class="m-2"
              vs-value="Plan Managed"
            >Plan</vs-radio>
          </label>
          <span class="block text-danger text-sm">{{ errors[0] }}</span>
        </validation-provider>
      </div>

      <div class="vx-col w-full md:w-1/2">
        <label class="block vs-input--label mt-4">Plan Start Date:</label>
        <validation-provider
          v-slot="{ errors }"
          rules="required"
        >
          <datepicker
            v-model="startDate"
            placeholder="DD / MM / YYYY"
            :format="dateFormat"
          />
          <span class="block text-danger text-sm">{{ errors[0] }}</span>
        </validation-provider>
      </div>
      <div class="vx-col w-full md:w-1/2">
        <label class="block vs-input--label mt-4">Plan End Date:</label>
        <validation-provider
          v-slot="{ errors }"
          rules="required"
        >
          <datepicker
            v-model="endDate"
            placeholder="DD / MM / YYYY"
            :format="dateFormat"
            :disabled-dates="disabledDates"
          />
          <span class="block text-danger text-sm">{{ errors[0] }}</span>
        </validation-provider>
      </div>
      <div
        v-if="planType === 'Self Managed'"
        class="vx-col w-auto mt-4"
      >
        <validation-provider
          v-slot="{ errors }"
          rules="required"
        >
          <upload-photo
            upload-text="Please upload your Self Managed NDIS Letter"
            @successUpload="(payload) => photoUpload = payload"
          />
          <input
            v-model="photoUpload"
            type="text"
            required
            hidden
          >

          <span class="block text-danger text-sm">{{ errors[0] }}</span>
        </validation-provider>
      </div>

      <div
        v-if="planType === 'Plan Managed'"
        class="vx-col w-full"
      >
        <label class="block vs-input--label mt-4">
          <span>Do you have a plan manager?</span>
          <vs-switch
            v-model="hasPlanManager"
            class="mt-1"
            icon-pack="feather"
            vs-icon-on="icon-check-circle"
            vs-icon-off="icon-slash"
          >
            <span slot="on">YES</span>
            <span slot="off">NO</span>
          </vs-switch>
        </label>

        <div
          v-if="hasPlanManager"
          class="w-full"
        >
          <validation-provider
            v-slot="{ errors }"
            rules="required"
          >
            <vs-input
              v-model="planManagerName"
              label="Plan Manager Name"
              class="w-full mt-2"
              required
            />
            <span class="block text-danger text-sm">{{ errors[0] }}</span>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            rules="required|email"
          >
            <vs-input
              v-model="planManagerEmail"
              type="email"
              label="Plan Manager Email"
              class="w-full mt-2"
              required
            />
            <span class="block text-danger text-sm">{{ errors[0] }}</span>
          </validation-provider>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { ValidationProvider } from "vee-validate";
import ValidationRules from "@/helpers/validation";
import UploadPhoto from "@/components/profile/UploadPhoto";

// Install rules from vee-validate
ValidationRules();

export default {
  components: {
    Datepicker,
    ValidationProvider,
    UploadPhoto
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      dateFormat: "d MMMM yyyy",
      participantNo: "430650298",
      planType: "",
      hasPlanManager: "",
      planManagerName: "",
      planManagerEmail: "",
      photoUpload: ""
    };
  },
  computed: {
    disabledDates() {
      return {
        to: new Date(this.startDate) // Disable all dates up to specific date
      };
    }
  },
  methods: {
    submitForm() {
      console.log("this is just a placeholder submit");
    },
    successUpload() {
      this.$vs.notify({
        color: "success",
        title: "Upload Success",
        text: "Lorem ipsum dolor sit amet, consectetur"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .vdp-datepicker {
  margin-top: 2px;
}
</style>
