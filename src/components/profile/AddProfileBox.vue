<template>
  <article class="add-profile-box my-10 md:mr-10">
    <div class="add-profile-box__icon-circle">
      <feather-icon
        :icon="icon"
        svg-classes="h-8 w-8"
      />
    </div>
    <span
      class="text-center mt-4 text-lg font-semibold"
      v-text="boxText"
    />
  </article>
</template>

<script>
export default {
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
    }
  }
};
</script>
<style lang="scss">
$lightGrey: rgba(9, 3, 3, 0.05);
$darkGrey: rgba(9, 3, 3, 0.5);
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
</style>
