<template>
  <section>
    <form-wizard
      color="rgba(var(--vs-primary), 1)"
      :title="'Kynd Support Pro Sign Up'"
      :subtitle="null"
      finish-button-text="Submit"
      @on-complete="formSubmitted"
    >
      <!-- tab 2 content -->
      <validation-observer v-slot="{ invalid }">
        <tab-content
          id="verification-tab"
          title="Verification"
          class="mb-5"
          :before-change="validateStep(invalid)"
        >
          <verification-step />
        </tab-content>
      </validation-observer>

      <!-- Personal Info Tab -->
      <validation-observer v-slot="{ invalid }">
        <tab-content
          id="personal-info-tab"
          title="Personal Info"
          class="mb-5"
          :before-change="validateStep(invalid)"
        >
          <support-pro-personal-info-step />
        </tab-content>
      </validation-observer>

      <!-- tab 4 content -->
      <tab-content
        id="profile-info-tab"
        title="Your Profile"
        class="mb-5"
      >
        <support-pro-profile-step />
      </tab-content>

      <!-- Payment Info Tab -->
      <validation-observer v-slot="{ invalid }">
        <tab-content
          id="financial-info-tab"
          title="Payment Info"
          class="mb-5"
          :before-change="validateStep(invalid)"
        >
          <financial-info-step />
        </tab-content>
      </validation-observer>

      <!-- tab 5 content -->
      <tab-content
        id="legals-tab"
        title="Your Profile"
        class="mb-5"
      >
        <legal-info-step />
      </tab-content>
    </form-wizard>
  </section>
</template>

<script>
import SupportProProfileStep from "./steps/SupportProProfileStep";
import FinancialInfoStep from "./steps/FinancialInfoStep";
import SupportProPersonalInfoStep from "./steps/SupportProPersonalInfoStep";
import VerificationStep from "./steps/VerificationsStep";
import LegalInfoStep from "./steps/LegalInfoStep";
import { FormWizard, TabContent } from "vue-form-wizard";
import { ValidationObserver } from "vee-validate";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

export default {
  components: {
    ValidationObserver,
    FormWizard,
    TabContent,
    LegalInfoStep,
    FinancialInfoStep,
    SupportProPersonalInfoStep,
    VerificationStep,
    SupportProProfileStep
  },
  methods: {
    formSubmitted() {
      alert("Form submitted!");
    },
    validateStep(invalid) {
      return () => {
        return !invalid;
      };
    }
  }
};
</script>

