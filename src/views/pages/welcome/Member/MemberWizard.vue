<template>
  <section>
    <form-wizard
      color="rgba(var(--vs-primary), 1)"
      :title="'Kynd Member Sign Up'"
      :subtitle="null"
      finish-button-text="Submit"
      @on-complete="formSubmitted"
    >
      <validation-observer v-slot="{ invalid }">
        <tab-content
          title="Personal Info"
          class="mb-5"
          :before-change="validateStep(invalid)"
        >
          <personal-info-step />
        </tab-content>
      </validation-observer>

      <!-- tab 2 content -->
      <tab-content
        title="Add a Profile"
        class="mb-5"
      >
        <validation-observer v-slot="{ invalid }">
          <add-profile-step />
        </validation-observer>
      </tab-content>

      <!-- tab 3 content -->
      <tab-content
        title="Payment Info"
        class="mb-5"
      >
        <validation-observer v-slot="{ invalid }">
          <payment-info-step />
        </validation-observer>
      </tab-content>
    </form-wizard>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import PaymentInfoStep from "./steps/PaymentInfoStep";
import AddProfileStep from "./steps/AddProfileStep";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import { FormWizard, TabContent } from "vue-form-wizard";
import { ValidationObserver } from "vee-validate";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
// import { UPDATE_CARE_ACCOUNT } from "@/http/graphql/mutations";
import gql from 'graphql-tag'

export default {
  components: {
    ValidationObserver,
    PaymentInfoStep,
    AddProfileStep,
    PersonalInfoStep,
    FormWizard,
    TabContent
  },
  computed: {
    ...mapGetters("auth", ["authenticatedUser"])
  },
  methods: {
    formSubmitted() {
      alert("Form submitted!");
    },
    validateStep(invalid) {
      return () => {
        if (!invalid) {
          
          this.$apollo
            .mutate({
              mutation: gql`
              mutation updateCareAccount($value: CareAccountUpdateInput!, $id: ID!) {
                updateCareAccount(id: $id, value: $value) {
                  success
                }
              }
              `,
              variables: {
                id: this.authenticatedUser.id,
                value: {
                  firstName: this.authenticatedUser.firstName,
                  lastName: this.authenticatedUser.lastName,
                  phoneNumber: this.authenticatedUser.phoneNumber
                }
              }
            })
            .then(data => {
              console.log("mutation success: ", data);
              this.$store.dispatch('updateUserInfo', { ...this.authenticatedUser })
              return true;
            })
            .catch(e => {
              console.error(e);
              return false;
            });
        }
        return !invalid
      };
    }
  }
};
</script>

