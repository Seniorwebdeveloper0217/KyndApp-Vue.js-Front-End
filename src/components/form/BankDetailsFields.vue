<template>
  <div class="vx-row mb-2 flex justify-center mt-4 mb-8 max-w-md m-auto">
    <div class="vx-col w-full max-w-md">
      <validation-provider
        v-slot="{ errors }"
        :rules="{ abnNo }"
      >
        <vs-input
          v-model="abnNumber"
          class="w-full"
          label-placeholder="ABN Number"
          type="tel"
          required
        />
        <span class="text-danger text-sm">{{ errors[0] }}</span>
      </validation-provider>
      <vs-divider />
    </div>

    <div class="vx-col w-full md:w-1/2 max-w-md">
      <validation-provider
        v-slot="{ errors }"
        :rules="{ bsbNo }"
      >
        <vs-input
          v-model="bsbNumber"
          class="w-full"
          label-placeholder="BSB"
          type="tel"
          required
        />
        <span class="text-danger text-sm">{{ errors[0] }}</span>
      </validation-provider>
    </div>

    <div class="vx-col w-full md:w-1/2">
      <validation-provider
        v-slot="{ errors }"
        rules="numeric|required"
      >
        <vs-input
          v-model="accountNumber"
          class="w-full"
          type="tel"
          label-placeholder="Account Number"
          required
        />
        <span class="text-danger text-sm">{{ errors[0] }}</span>
      </validation-provider>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { bsbNo, abnNo } from "@/utils/regexs";

import ValidationRules from "@/helpers/validation";
// Install rules from vee-validate
ValidationRules();

export default {
  components: {
    ValidationProvider
  },
  data() {
    return {
      accountNumber: "",
      bsbNumber: "123123",
      abnNumber: "12345678911",
      bsbNo,
      abnNo
    };
  }
};
</script>
