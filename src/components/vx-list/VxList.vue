<!-- =========================================================================================
    File Name: VxList.vue
    Description: list Component
    Component Name: VxList
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template functional>
  <ul class="list">
    <li
      v-for="(item, index) in props.list"
      :key="index"
      class="list__item"
    >
      <feather-icon
        :icon="props.icon"
        class="w-5 h-5 mr-1"
      /><span v-html="item" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "VxList",
  props: {
    list: {
      type: Array,
      required: true
    },
    icon: {
      type: String,
      default: "ChevronsRightIcon"
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/components/vxList.scss";
</style>
