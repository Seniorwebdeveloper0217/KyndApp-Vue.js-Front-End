<template>
  <article>
    <label
      v-if="includeLabel"
      for="profile-photo-upload"
      class="vs-input--label"
      v-text="'Upload Profile Photo'"
    />
    <vs-upload
      id="profile-photo-upload"
      :text="uploadText"
      :limit="1"
      action="/"
      automatic
      @on-error="onUpload"
      @on-success="onUpload"
    />
  </article>
</template>

<script>
export default {
  props: {
    includeLabel: {
      type: Boolean,
      required: false,
      default: false
    },
    uploadText: {
      type: String,
      default: "Upload Profile Photo",
      required: false
    }
  },
  methods: {
    onUpload(e) {
      console.log({ e });
      // TODO: set error / success properly
      this.$vs.notify({
        color: "success",
        title: "Upload Success",
        text: "Lorem ipsum dolor sit amet, consectetur"
      });
      this.$emit("onUpload", e.loaded);
    }
  }
};
</script>

<style lang="scss" scoped>
$darkGrey: rgba(9, 3, 3, 0.5);

/deep/ .con-img-upload {
  padding: 0;
  .img-upload {
    margin: 0;
  }

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
}

/deep/ .con-input-upload {
  margin: 0;
  border: 2px dashed $darkGrey;

  .text-input {
    padding: 10px !important;
  }

  &.disabled-upload {
    display: none;
    opacity: 0;
  }
}
</style>
