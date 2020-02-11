<template>
  <section>
    <!-- <p class="text-xl text-center pb-10">Click the box below to add a user profile</p> -->
    <div class="vx-row flex justify-center">
      <!-- Edit an existing profile -->
      <add-profile-box
        v-for="(profile, index) in authenticatedUser.careProfiles"
        :key="'profile__' + index"
        icon="UserCheckIcon"
        box-text="Edit"
        @click.native="showProfile(profile, 'Edit', (index > 0 ? index - 1 : index))"
      />

      <!-- Add a new profile -->
      <add-profile-box @click.native="showProfile(null, 'Add', careUsersLength)" />
    </div>

    <!-- The popup dialog wrapped in a validation observer -->

    <vs-prompt
      :is-valid="true"
      title="Add Profile"
      :active.sync="activePrompt"
      :accept-text="acceptText"
      @close="close"
      @cancel="close"
      @accept="acceptAlert"
    >
      <add-profile-form
        v-if="activePrompt"
        :profile-index="profileIndex"
        :profile="selectedProfile"
        :accept-text="acceptText"
        :active-prompt="activePrompt"
        :close="close"
      />
    </vs-prompt>
  </section>
</template>

<script>
import AddProfileForm from "@/components/profile/AddProfileForm";
import AddProfileBox from "@/components/profile/AddProfileBox";
// import { ValidationObserver } from "vee-validate";
import { mapGetters } from "vuex";
import gql from "graphql-tag";

const ADD_CARE_PROFILE = gql`
  mutation addCareProfile(
    $value: CareProfileCreateInput!
    $accountId: ID!
    $relation: Relation!
  ) {
    addCareProfile(value: $value, accountId: $accountId, relation: $relation) {
      id
    }
  }
`;

export default {
  components: {
    AddProfileBox,
    AddProfileForm
    // ValidationObserver
  },
  data() {
    return {
      acceptText: "Add",
      selectedProfile: {
        address: {}
      },
      profileIndex: 0,
      activePrompt: false
    };
  },

  computed: {
    ...mapGetters("auth", ["authenticatedUser"]),
    careUsersLength() {
      return this.authenticatedUser.careProfiles.length;
    }
  },

  methods: {
    close() {
      this.$vs.notify({
        color: "danger",
        title: "Closed",
        text: "You closed a dialog!"
      });
      this.selectedProfile = {};
      this.activePrompt = false;
    },
    showProfile(profile, acceptText, index) {
      this.activePrompt = true;
      this.selectedProfile = profile !== null ? profile : {};
      this.acceptText = acceptText;
      this.profileIndex = index;
    },
    acceptAlert() {
      let profile = this.profile;
      if (Object.keys(this.selectedProfile).length) {
        profile = this.selectedProfile;
      }

      this.onSubmit({ ...profile }, this.profileIndex);

      this.close();
    },

    async onSubmit(profile, profileIndex) {
      console.log("dispatch: ", profile, profileIndex);
      await this.$store.dispatch("auth/updateCareProfile", {
        profile,
        profileIndex
      });

      console.log({ ADD_CARE_PROFILE });

      // GraphQL mutation
      // this.$apollo.mutate({
      //   mutation: ADD_CARE_PROFILE,
      //   variables: {
      //     value: {
      //       firstName: this.profile.firstName,
      //       lastName: this.profile.lastName,
      //       gender: this.profile.gender,
      //       birthDate: this.profile.birthDate,
      //       address: this.profile.address,
      //       description: 'test'
      //       // avatarUrl: this.profile.photoUpload,
      //     },
      //     accountId: this.user.id,
      //     relation: this.profile.relation
      //   }
      // }).then(data => {
      // })
      // .catch(e => {
      //   console.log('profile mutation error: ', JSON.stringify(e))
      // })
    }
  }
};
</script>
<style lang="scss" scoped>
$lightGrey: rgba(9, 3, 3, 0.05);
$darkGrey: rgba(9, 3, 3, 0.5);
$tailwindSml: 576px;

.add-profile-box {
  cursor: pointer;
  border: 2px dashed $darkGrey;
  background: #f5f5f5;
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  border-radius: 8px;
  position: relative;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 5px;
  margin-top: 5px;
  margin-bottom: 5px;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  &__icon-circle {
    font-size: 18px;
    // border: 2px solid $lightGrey;
    border-radius: 50%;
    font-weight: 600;
    width: 70px;
    height: 70px;
    background-color: $lightGrey;
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;
  }
}

/deep/ .vs-dialog {
  width: 85%;
  min-width: 50%;
  max-width: 1000px;

  @media screen and (max-width: $tailwindSml) {
    .vs-dialog-text {
      max-height: 75vh;
      overflow-y: scroll;
    }
  }
}
</style>

<style lang="scss" scoped>
$tailwindSml: 576px;

/deep/ .vs-dialog {
  width: 85%;
  min-width: 50%;
  max-width: 1000px;

  @media screen and (max-width: $tailwindSml) {
    .vs-dialog-text {
      max-height: 75vh;
      overflow-y: scroll;
    }
  }
}
</style>

