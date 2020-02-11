<!-- =========================================================================================
	File Name: SearchWishList.vue
	Description: search Wish List Page
	----------------------------------------------------------------------------------------
	Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="search-shortlist-demo">
    <div
      v-if="shortListItems.length"
      class="items-grid-view vx-row match-height"
      appear
    >
      <div
        v-for="item in shortListItems"
        :key="item.objectID"
        class="vx-col lg:w-1/4 md:w-1/3 sm:w-1/2 w-full"
      >
        <item-grid-view :item="item">
          <!-- SLOT: ACTION BUTTONS -->
          <template slot="action-buttons">
            <div class="flex flex-wrap">
              <!-- PRIMARY BUTTON : REMOVE -->
              <div
                class="item-view-primary-action-btn p-3 flex flex-grow items-center justify-center cursor-pointer"
                @click="removeItemFromShortList(item)"
              >
                <feather-icon
                  icon="XIcon"
                  svg-classes="h-4 w-4"
                />
                <span class="text-sm font-semibold ml-2">REMOVE</span>
              </div>

              <!-- SECONDARY BUTTON: MOVE TO CART -->
              <div
                class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
                @click="cartButtonClicked(item)"
              >
                <feather-icon
                  icon="ShoppingBagIcon"
                  svg-classes="h-4 w-4"
                />

                <span
                  v-if="isInCart(item.objectID)"
                  class="text-sm font-semibold ml-2"
                >VIEW IN CART</span>
                <span
                  v-else
                  class="text-sm font-semibold ml-2"
                >MOVE TO CART</span>
              </div>
            </div>
          </template>
        </item-grid-view>
      </div>
    </div>

    <!-- IF NO ITEMS IN CART -->
    <vx-card
      v-else
      title="You don't have any carers saved in your shortlist."
    >
      <vs-button @click="$router.push('/apps/search/shop').catch(() => {})">
        Search Carers
      </vs-button>
    </vx-card>
  </div>
</template>

<script>
const ItemGridView = () => import("./components/ItemGridView.vue");

export default {
  components: {
    ItemGridView
  },
  computed: {
    shortListItems() {
      return this.$store.state.search.shortList.slice().reverse();
    },
    isInCart() {
      return itemId => this.$store.getters["search/isInCart"](itemId);
    },
    isInShortList() {
      return itemId => this.$store.getters["search/isInShortList"](itemId);
    }
  },
  methods: {
    removeItemFromShortList(item) {
      this.$store.dispatch("search/toggleItemInShortList", item);
    },
    cartButtonClicked(item) {
      if (this.isInCart(item.objectID))
        this.$router.push("/apps/search/checkout").catch(() => {});
      else {
        this.additemInCart(item);
        this.removeItemFromShortList(item);
      }
    },
    additemInCart(item) {
      this.$store.dispatch("search/additemInCart", item);
    }
  }
};
</script>

<style lang="scss" scoped>
#search-shortlist-demo {
  .item-view-primary-action-btn {
    color: #2c2c2c !important;
    background-color: #f6f6f6;
    min-width: 50%;
  }

  .item-view-secondary-action-btn {
    min-width: 50%;
  }
}
</style>
