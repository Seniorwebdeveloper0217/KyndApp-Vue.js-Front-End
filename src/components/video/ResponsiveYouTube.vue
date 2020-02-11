<template>
  <article class="embed-container">
    <iframe
      :src="`https://www.youtube.com/embed/${videoEmbedId}`"
      frameborder="0"
      allowfullscreen
    />
  </article>
</template>

<script>
export default {
  props: {
    videoEmbedId: {
      type: String,
      required: true,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}
.embed-container iframe,
.embed-container object,
.embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
