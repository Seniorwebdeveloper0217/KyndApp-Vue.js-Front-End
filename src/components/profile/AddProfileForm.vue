<template>
  <div class="con-exemple-prompt">
    <form class="mx-10 mt-2 mb-0">
      <div class="vx-col w-full">
        <h5>Profile Information</h5>
        <vs-divider class="mb-0" />
      </div>
      <!-- 
        ========================= 
          PROFILE NAME & INFO
        =========================
      -->
      <section class="flex justify-center flex-col md:flex-row">
        <div class="vx-row">
          <div class="vx-col mt-6 mr-10">
            <!-- Profile Photo Upload -->
            <validation-provider
              v-slot="{ errors }"
              rules="required"
            >
              <upload-photo
                :include-label="true"
                @onUpload="(payload) => profileModel.photoUpload = payload"
              />
              <input
                v-model="profileModel.photoUpload"
                type="text"
                required
                hidden
              >
              <span class="text-danger text-sm">{{ errors[0] }}</span>
            </validation-provider>
          </div>
        </div>

        <!-- First Name -->
        <div class="vx-row flex">
          <div class="vx-col w-full lg:w-1/3 mt-6">
            <validation-provider
              v-slot="{ errors }"
              rules="required"
            >
              <vs-input
                v-model="profileModel.firstName"
                required
                class="w-full"
                label-placeholder="First Name"
              />
              <span class="text-danger text-sm">{{ errors[0] }}</span>
            </validation-provider>
          </div>

          <!-- Last Name -->
          <div class="vx-col w-full lg:w-1/3 mt-6">
            <validation-provider
              v-slot="{ errors }"
              rules="required"
            >
              <vs-input
                v-model="profileModel.lastName"
                required
                class="w-full"
                label-placeholder="Last Name"
              />
              <span class="text-danger text-sm">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="vx-col w-full lg:w-1/3 mt-6">
            <date-of-birth-field v-model="profileModel.birthDate" />
          </div>

          <!-- Relationship -->
          <div class="vx-col w-full mt-6">
            <validation-provider
              v-slot="{ errors }"
              rules="required"
            >
              <label class="block vs-input--label">
                Relationship
                <vs-select
                  v-if="relationshipList"
                  v-model="profileModel.relation"
                  class="w-full select-large"
                  placeholder="Relationship"
                >
                  <vs-select-item
                    v-for="(item,index) in relationshipList.enumValues"
                    :key="item.name + '_' + index"
                    :value="item.name"
                    :text="item.name"
                    class="w-full"
                  />
                </vs-select>
              </label>
              <span class="text-danger text-sm">{{ errors[0] }}</span>
            </validation-provider>
          </div>

          <!-- Gender -->
          <div class="vx-col w-full mt-6">
            <validation-provider
              v-slot="{ errors }"
              rules="required"
            >
              <label class="block vs-input--label">
                Gender
                <vs-select
                  v-model="profileModel.gender"
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
        </div>
      </section>

      <!-- 
          ========================= 
            PROFILE ADDRESS INFO
          =========================
      -->
      <section class="flex justify-center flex-col md:flex-row">
        <address-fields
          :address="address"
          @update:address="address = $event"
        />
      </section>
    </form>
  </div>
</template>


<script>
import DateOfBirthField from "@/components/form/DateOfBirthField";
import UploadPhoto from "@/components/profile/UploadPhoto";
import AddressFields from "@/components/form/AddressFields";
import { ValidationProvider } from "vee-validate";
import { RELATION_ENUMS } from "@/http/graphql/queries";
import { setGenderFromRelationship } from "@/utils";
import ValidationRules from "@/helpers/validation";

// Install rules from vee-validate
ValidationRules();

export default {
  components: {
    DateOfBirthField,
    UploadPhoto,
    ValidationProvider,
    AddressFields
  },
  apollo: {
    relationshipList: {
      query: RELATION_ENUMS
    }
  },
  props: {
    profile: {
      type: Object,
      default: () => ({
        address: {}
      })
    },
    profileIndex: {
      type: [String, Number],
      default: 0
    },
    address: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      relationshipList: []
    };
  },

  computed: {
    profileModel: {
      get() {
        return this.profile;
      },
      set(value) {
        this.$emit("update:profile", value);
      }
    },
    addressModel: {
      get() {
        return this.address;
      },
      set(value) {
        this.$emit("update:address", value);
      }
    }
  },

  watch: {
    profileModel: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        const relation = newVal.relation;
        if (!relation) return;
        this.profileModel.gender = setGenderFromRelationship(
          relation.toLowerCase()
        );
      }
    }
  },

  mounted() {
    if (this.profile && this.profile.firstName) {
      this.profileModel = this.profile;
      this.address = this.profile.address;
    }
    console.log("mounted: ", this.profile, this.address);
  }
};
</script>
