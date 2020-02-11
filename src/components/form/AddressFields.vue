<template>
  <section class="vx-row">
    <div class="vx-col w-full mt-10 mb-4">
      <h5>{{ formTitleText }}</h5>
      <vs-divider class="mb-0" />
    </div>

    <div class="vx-col sm:w-2/5 w-full">
      <validation-provider
        v-slot="{ errors }"
        rules="required"
      >
        <vs-input
          v-model="addressModel.street"
          name="Address"
          label-placeholder="Address"
          class="w-full mt-6"
        />
        <span class="text-danger text-sm">{{ errors[0] }}</span>
      </validation-provider>
    </div>

    <div class="vx-col sm:w-1/5 w-full">
      <validation-provider
        v-slot="{ errors }"
        rules="required"
      >
        <vs-input
          v-model="addressModel.suburb"
          name="suburb"
          label-placeholder="Suburb"
          class="w-full mt-6"
        />
        <span class="text-danger text-sm">{{ errors[0] }}</span>
      </validation-provider>
    </div>

    <div class="vx-col sm:w-1/5 w-full">
      <validation-provider
        v-slot="{ errors }"
        rules="required"
      >
        <label class="block vs-input--label mt-1">
          State
          <vs-select
            v-model="addressModel.state"
            class="w-full"
            name="state"
            placeholder="State"
          >
            <vs-select-item
              v-for="(item,index) in states"
              :key="item.name + '_' + index"
              :value="item.shortName"
              :text="item.shortName"
              class="w-full"
            />
          </vs-select>
        </label>
        <span class="text-danger text-sm">{{ errors[0] }}</span>
      </validation-provider>
    </div>

    <div class="vx-col sm:w-1/5 w-full">
      <validation-provider
        v-slot="{ errors }"
        rules="required|postCode:4|min:4"
      >
        <vs-input
          v-model="addressModel.postCode"
          name="postCode"
          label-placeholder="Postcode"
          class="w-full mt-6"
        />
        <span class="text-danger text-sm">{{ errors[0] }}</span>
      </validation-provider>
    </div>
  </section>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { states } from "@/helpers/location/states";
import ValidationRules from "@/helpers/validation";
// Install rules from vee-validate
ValidationRules();

export default {
  components: {
    ValidationProvider
  },
  props: {
    formTitleText: {
      type: String,
      default: "Default Care Location",
      required: false
    },
    address: {
      type: Object,
      default: () => ({
        street: "",
        state: "",
        suburb: "",
        postCode: '',
        country: 'Australia'
      }),
      required: false
    }
  },
  data() {
    return {
      states
    };
  },
  computed: {
    // bind a prop two-ways
    // ref: https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier
    addressModel: {
      get () { return this.address },
      set (value) { 
        this.$emit('addressUpdated', value) 
      }
    }
  }
};
</script>
