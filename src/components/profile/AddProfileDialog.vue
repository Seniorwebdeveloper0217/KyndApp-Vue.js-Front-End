<template>
  <article
    class="add-info-in-dialog my-10 md:mr-10"
    @click="activePrompt = true"
  >
    <div class="add-info-in-dialog__icon-circle">
      <feather-icon
        :icon="icon"
        svg-classes="h-8 w-8"
      />
    </div>
    <span
      class="text-center mt-4 text-lg font-semibold"
      v-text="boxText"
    />

    <validation-observer v-slot="{ invalid }">
      <vs-prompt
        :is-valid="!invalid"
        :title="boxText"
        :active.sync="activePrompt"
        accept-text="Add"
        @cancel="close"
        @accept="onSubmit"
        @close="close"
      >
        <div class="con-exemple-prompt">
          <add-profile-form :profile="profile" />
        </div>
      </vs-prompt>
    </validation-observer>
  </article>
</template>

<script>
import AddProfileForm from '@/components/profile/AddProfileForm';
import { ValidationObserver } from "vee-validate";

export default {
  components: {
    ValidationObserver,
    AddProfileForm
  },
  props: {
    icon: {
      type: String,
      default: "UserPlusIcon",
      required: false
    },
    boxText: {
      type: String,
      default: "Add Profile",
      required: false
    },
    onSubmit: {
      type: Function,
      default: () => {}
    },
    profile: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      activePrompt: false,
    };
  },
  methods: {
    close() {
      this.$vs.notify({
        color: "danger",
        title: "Closed",
        text: "You closed a dialog!"
      });
      this.activePrompt = false
    }
  }
};
</script>

<style lang="scss" scoped>
$lightGrey: rgba(9, 3, 3, 0.05);
$darkGrey: rgba(9, 3, 3, 0.5);
$tailwindSml: 576px;

.add-info-in-dialog {
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
