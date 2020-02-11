<template>
  <form>
    <section class="vx-row flex md:justify-center">
      <div class="vx-col mt-6">
        <validation-provider
          v-slot="{ errors }"
          rules="required"
        >
          <label class="block vs-input--label">
            Gender
            <vs-select
              v-model="gender"
              class="w-full select-large"
              placeholder="Gender"
            >
              <vs-select-item
                v-for="(item,index) in ['Male', 'Female', 'Other']"
                :key="item + '_' + index"
                :value="item"
                :text="item"
                class="w-full"
              />
            </vs-select>
          </label>
          <span class="text-danger text-sm">{{ errors[0] }}</span>
        </validation-provider>
      </div>

      <div class=" vx-col mt-6">
        <date-of-birth-field />
      </div>

      <div class="vx-col mt-5">
        <validation-provider
          v-slot="{ errors }"
          :rules="{ mobileNo }"
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

    <!-- Address Form Fields -->
    <section>
      <address-fields
        form-title-text="Home Address"
        @addressUpdated="addressUpdated"
      />
    </section>
  </form>
</template>

<script>
import DateOfBirthField from "@/components/form/DateOfBirthField";
import AddressFields from "@/components/form/AddressFields";
import { ValidationProvider } from "vee-validate";
import { mobileNo } from "@/utils/regexs";

export default {
  components: {
    AddressFields,
    ValidationProvider,
    DateOfBirthField
  },
  data() {
    return {
      address: {},
      phoneNumber: "0434567890",
      gender: "Male",
      birthDate: "1 October 2019",
      mobileNo
    };
  },

  methods: {
    addressUpdated(payload) {
      this.address = payload;
    }
  }
};
</script>
