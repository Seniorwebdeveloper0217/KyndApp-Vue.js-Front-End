<template>
  <section class="w-full max-w-150 lg:ml-auto lg:mr-auto">
    <label
      class="block vs-input--label"
      v-text="'Date of Birth'"
    />
    <vue-cleave
      :value="value"
      :options="options"
      placeholder="DD/MM/YYYY"
      class="vs-inputx vs-input--input normal"
      @input="(newDOB) => { onInput(newDOB) }"
    />
    <span
      v-if="invalidYear"
      class="text-danger text-sm"
      v-text="'Enter a valid year.'"
    />
  </section>
</template>

<script>
import Cleave from "vue-cleave-component";
import ValidationRules from "@/helpers/validation";

// Install rules from vee-validate
ValidationRules();

export default {
  components: {
    "vue-cleave": Cleave
  },
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      options: {
        date: true,
        delimiter: "/",
        datePattern: ["d", "m", "Y"]
      }
    };
  },
  computed: {
    invalidYear() {
      const thisYear = new Date().getFullYear();
      const dob = String(this.value);
      const yearInput = dob.slice(dob.length - 4);

      if (dob.length < 8) return false;
      return yearInput > thisYear || yearInput < 1900;
    }
  },
  methods: {
    onInput() {
      // const dob = this.value;
      // const day = dob.substring(0, 2);
      // const month = dob.substring(2, 4);
      // const year = dob.substring(4);
      // this.$emit('input', `${day}/${month}/${year}`)
    }
  }
};
</script>
