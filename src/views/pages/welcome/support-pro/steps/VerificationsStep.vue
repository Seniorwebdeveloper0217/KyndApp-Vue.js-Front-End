<template>
  <section class="vx-row flex justify-center">
    <div class="vx-col my-4">
      <validation-provider
        v-slot="{ errors }"
        rules="required"
      >
        <upload-photo
          upload-text="Please upload your Government ID"
          @onUpload="(payload) => govIdUpload = payload"
        >
          <input
            v-model="govIdUpload"
            type="text"
            required
            hidden
          >
          <span class="text-danger text-sm">{{ errors[0] }}</span>
        </upload-photo>
      </validation-provider>
    </div>

    <div class="vx-col my-4">
      <validation-provider
        v-slot="{ errors }"
        rules="required"
      >
        <upload-photo
          upload-text="Please upload your Police Check"
          @onUpload="(payload) => policeCheckUpload = payload"
        />
        <input
          v-model="policeCheckUpload"
          type="text"
          required
          hidden
        >
        <span class="text-danger text-sm">{{ errors[0] }}</span>
      </validation-provider>
    </div>

    <div class="vx-col my-4">
      <upload-photo
        upload-text="Please upload your WWC Check"
        @onUpload="(payload) => workingWithChildrenUpload = payload"
      />
    </div>
  </section>
</template>

<script>
import UploadPhoto from "@/components/profile/UploadPhoto";
import { ValidationProvider } from "vee-validate";

export default {
  components: {
    UploadPhoto,
    ValidationProvider
  },
  data() {
    return {
      hasWorkingWithChildrenDoc: false,
      workingWithChildrenUpload: "123",
      hasGovId: true,
      govIdUpload: "123",
      hasPoliceCheck: true,
      policeCheckUpload: "123",
      hasFirstAidCert: false,
      hasCurrentFirstAid: false,
      hasCPRCert: false
    };
  }
};
</script>

<style>
</style>
