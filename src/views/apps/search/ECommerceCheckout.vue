<!-- =========================================================================================
	File Name: ECommerceCheckout.vue
	Description: search Checkout page
	----------------------------------------------------------------------------------------
	Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="search-checkout-demo">
    <form-wizard
      ref="checkoutWizard"
      color="rgba(var(--vs-primary), 1)"
      :title="null"
      :subtitle="null"
      :hide-buttons="true"
    >
      <!-- tab 1 content -->
      <tab-content
        title="Cart"
        icon="feather icon-shopping-cart"
        class="mb-5"
      >
        <!-- IF CART HAVE ITEMS -->
        <div
          v-if="cartItems.length"
          class="vx-row"
        >
          <!-- LEFT COL -->
          <div class="vx-col lg:w-2/3 w-full relative">
            <div
              v-for="(item, index) in cartItems"
              :key="item.objectID"
              class="items-list-view"
            >
              <item-list-view :item="item">
                <!-- SLOT: ITEM META -->
                <template slot="item-meta">
                  <h6 class="item-name font-semibold mb-1">
                    {{ item.name }}
                  </h6>
                  <p class="text-sm mb-2 cursor-pointer">
                    By
                    <span class="text-primary font-semibold">
                      {{
                        item.brand
                      }}
                    </span>
                  </p>
                  <p class="text-success text-sm">
                    In Stock
                  </p>

                  <p class="mt-4 font-bold text-sm">
                    Quantity
                  </p>
                  <vs-input-number
                    min="1"
                    max="10"
                    :value="item.quantity"
                    class="inline-flex"
                    @input="updateItemQuantity($event, index)"
                  />

                  <p class="font-medium text-grey mt-4">
                    Delivery by, {{ item.delivery_date }}
                  </p>
                  <p class="text-success font-medium">
                    {{ item.discount_in_percentage }}% off
                    {{ item.offers_count }} offers Available
                  </p>
                </template>

                <!-- SLOT: ACTION BUTTONS -->
                <template slot="action-buttons">
                  <!-- PRIMARY BUTTON: REMOVE -->
                  <div
                    class="item-view-primary-action-btn p-3 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-3"
                    @click="removeItemFromCart(item)"
                  >
                    <feather-icon
                      icon="XIcon"
                      svg-classes="h-4 w-4"
                    />
                    <span class="text-sm font-semibold ml-2">REMOVE</span>
                  </div>

                  <!-- SECONDARY BUTTON: MOVE-TO/VIEW-IN SHORTLIST -->
                  <div
                    class="item-view-secondary-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer"
                    @click="shortListButtonClicked(item)"
                  >
                    <feather-icon
                      icon="HeartIcon"
                      :svg-classes="[
                        {
                          'text-white fill-current': isInShortList(item.objectID)
                        },
                        'h-4 w-4'
                      ]"
                    />
                    <span
                      v-if="isInShortList(item.objectID)"
                      class="text-sm font-semibold ml-2"
                      v-text="'SHORTLIST'"
                    />
                    <span
                      v-else
                      class="text-sm font-semibold ml-2"
                      v-text="'SHORTLIST'"
                    />
                  </div>
                </template>
              </item-list-view>
            </div>
          </div>

          <!-- RIGHT COL -->
          <div class="vx-col lg:w-1/3 w-full">
            <vx-card>
              <p class="text-grey mb-3">
                Options
              </p>
              <div class="flex justify-between">
                <span class="font-semibold">Coupons</span>
                <span class="font-medium text-primary cursor-pointer">Apply</span>
              </div>

              <vs-divider />

              <p class="font-semibold mb-3">
                Price Details
              </p>
              <div class="flex justify-between mb-2">
                <span class="text-grey">Total MRP</span>
                <span>$598</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-grey">Bag Discount</span>
                <span class="text-success">-25$</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-grey">Estimated Tax</span>
                <span>$1.3</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-grey">EMI Eligibility</span>
                <a
                  href="#"
                  class="text-primary"
                >Details</a>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-grey">Delivery Charges</span>
                <span class="text-success">Free</span>
              </div>

              <vs-divider />

              <div class="flex justify-between font-semibold mb-3">
                <span>Total</span>
                <span>$574.3</span>
              </div>

              <vs-button
                class="w-full"
                @click="$refs.checkoutWizard.nextTab()"
              >
                PLACE ORDER
              </vs-button>
            </vx-card>
          </div>
        </div>

        <!-- IF NO ITEMS IN CART -->
        <vx-card
          v-else
          title="You don't have any items in your cart."
        >
          <vs-button @click="$router.push('/apps/search/shop').catch(() => {})">
            Search Carers
          </vs-button>
        </vx-card>
      </tab-content>

      <!-- tab 2 content -->
      <tab-content
        title="Address"
        icon="feather icon-home"
        class="mb-5"
      >
        <div class="vx-row">
          <!-- LEFT COL: NEW ADDRESS -->
          <div class="vx-col lg:w-2/3 w-full">
            <vx-card
              title="Add New Address"
              subtitle="Be sure to check &quot;Deliver to this address&quot; when you have finished"
              class="mb-base"
            >
              <form data-vv-scope="add-new-address">
                <div class="vx-row">
                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      v-model="fullName"
                      data-vv-as="field"
                      name="fullName"
                      label="Full Name:"
                      class="w-full mt-5"
                    />
                  </div>

                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      v-model="mobileNum"
                      name="mobileNum"
                      label="Mobile Number:"
                      class="w-full mt-5"
                    />
                  </div>
                </div>

                <div class="vx-row">
                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      v-model="houseNum"
                      name="houseNum"
                      label="Flat, House No:"
                      class="w-full mt-5"
                    />
                  </div>

                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      v-model="landmark"
                      name="landmark"
                      label="Landmark e.g. near apollo hospital:"
                      class="w-full mt-5"
                    />
                  </div>
                </div>

                <div class="vx-row">
                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      v-model="city"
                      name="city"
                      label="Town/City:"
                      class="w-full mt-5"
                    />
                  </div>

                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      v-model="pincode"
                      name="pincode"
                      label="Pincode:"
                      class="w-full mt-5"
                    />
                  </div>
                </div>

                <div class="vx-row">
                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      v-model="state"
                      name="state"
                      label="State:"
                      class="w-full mt-5"
                    />
                  </div>

                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-select
                      v-model="addressType"
                      label="Address Type:"
                      class="w-full mt-5"
                    >
                      <vs-select-item
                        v-for="(item, index) in addressTypeOptions"
                        :key="index"
                        :value="item.value"
                        :text="item.text"
                      />
                    </vs-select>
                  </div>
                </div>
                <vs-button
                  class="mt-6 ml-auto flex"
                  @click.prevent="submitNewAddressForm"
                >
                  SAVE AND DELIVER HERE
                </vs-button>
              </form>
            </vx-card>
          </div>

          <!-- RIGHT COL: CONTINUE WITH SAVED ADDRESS -->
          <div class="vx-col lg:w-1/3 w-full">
            <vx-card title="John Doe">
              <div>
                <p>9447 Glen Eagles Drive</p>
                <p>Lewis Center, OH 43035</p>
                <p class="my-4">
                  UTC-5: Eastern Standard Time (EST)
                </p>
                <p>202-555-0140</p>
              </div>

              <vs-divider />

              <vs-button
                class="w-full"
                @click="$refs.checkoutWizard.nextTab()"
              >
                DELIVER TO THIS ADDRESS
              </vs-button>
            </vx-card>
          </div>
        </div>
      </tab-content>

      <!-- tab 3 content -->
      <tab-content
        title="Payment"
        icon="feather icon-credit-card"
        class="mb-5"
      >
        <div class="vx-row">
          <!-- LEFT COL: PAYMENT OPTIONS -->
          <div class="vx-col lg:w-2/3 w-full">
            <vx-card
              title="Payment Options"
              subtitle="Be sure to click on correct payment option"
              class="mb-base"
            >
              <div class="mt-3">
                <ul>
                  <!-- OPTION 1 -->
                  <li>
                    <!-- CARD DETAILS -->
                    <div class="flex flex-wrap justify-between items-center">
                      <vs-radio
                        v-model="paymentMethod"
                        vs-value="debit-card"
                      >
                        <div class="flex items-center">
                          <img
                            src="@/assets/images/pages/search/bank.png"
                            alt="bank-logo"
                            height="40"
                            width="50"
                            class="inline-flex"
                          >
                          <span>US Unlocked Debit Card 12XX XXXX XXXX 0000</span>
                        </div>
                      </vs-radio>
                      <span>John Doe</span>
                      <span>11/2020</span>
                    </div>

                    <!-- CVV BLOCK -->
                    <form data-vv-scope="cvv-form">
                      <div class="flex items-center flex-wrap">
                        <span class="mt-4">Enter CVV:</span>
                        <vs-input
                          v-model="cvv"
                          name="cvv"
                          class="mr-3 ml-2 mt-4"
                        />
                        <vs-button
                          class="mt-4"
                          :disabled="false"
                          @click.prevent="makePayment"
                        >
                          CONTINUE
                        </vs-button>
                      </div>
                    </form>
                  </li>

                  <vs-divider class="my-6" />

                  <!-- OPTION 2 -->
                  <li>
                    <vs-radio
                      v-model="paymentMethod"
                      vs-value="credit-debit-atmCard"
                    >
                      Credit / Debit / ATM Card
                    </vs-radio>
                  </li>

                  <!-- OPTION 3 -->
                  <li class="mt-2">
                    <vs-radio
                      v-model="paymentMethod"
                      vs-value="netBanking"
                    >
                      Net Banking
                    </vs-radio>
                  </li>

                  <!-- OPTION 4 -->
                  <li class="mt-2">
                    <vs-radio
                      v-model="paymentMethod"
                      vs-value="emi"
                    >
                      EMI (Easy Installment)
                    </vs-radio>
                  </li>

                  <!-- OPTION 5 -->
                  <li class="mt-2">
                    <vs-radio
                      v-model="paymentMethod"
                      vs-value="cashOnDelivery"
                    >
                      Cash On Delivery
                    </vs-radio>
                  </li>
                </ul>

                <vs-divider />

                <!-- GIFT CARD -->
                <div class="inline-flex items-center cursor-pointer">
                  <feather-icon
                    icon="PlusSquareIcon"
                    class="mr-2"
                    svg-classes="h-6 w-6"
                  />
                  <span>Add Gift Card</span>
                </div>
              </div>
            </vx-card>
          </div>

          <!-- RIGHT COL: PRICE -->
          <div class="vx-col lg:w-1/3 w-full">
            <vx-card title="Price Details">
              <div class="flex justify-between mb-2">
                <span>Price 3 Items</span>
                <span class="font-semibold">$699.30</span>
              </div>
              <div class="flex justify-between mb-2">
                <span>Delivery Charges</span>
                <span class="text-success">Free</span>
              </div>

              <vs-divider />

              <div class="flex justify-between">
                <span>Amount Payable</span>
                <span class="font-semibold">$699.30</span>
              </div>
            </vx-card>
          </div>
        </div>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
const ItemListView = () => import("./components/ItemListView.vue");

export default {
  components: {
    ItemListView,
    FormWizard,
    TabContent
  },
  data() {
    return {
      // TAB 2
      fullName: "",
      mobileNum: "",
      pincode: "",
      houseNum: "",
      area: "",
      landmark: "",
      city: "",
      state: "",
      addressType: 1,
      addressTypeOptions: [
        { text: "Home", value: 1 },
        { text: "Office", value: 2 }
      ],

      // TAB 3
      paymentMethod: "debit-card",
      cvv: ""
    };
  },
  computed: {
    cartItems() {
      return this.$store.state.search.cartItems.slice().reverse();
    },
    isInShortList() {
      return itemId => this.$store.getters["search/isInShortList"](itemId);
    }
  },
  methods: {
    // TAB 1
    removeItemFromCart(item) {
      this.$store.dispatch("search/toggleItemInCart", item);
    },
    shortListButtonClicked(item) {
      // Toggle in Short List
      if (this.isInShortList(item.objectID))
        this.$router.push("/apps/search/wish-list").catch(() => {});
      else {
        this.toggleItemInShortList(item);
        this.removeItemFromCart(item);
      }
    },
    toggleItemInShortList(item) {
      this.$store.dispatch("search/toggleItemInShortList", item);
    },
    updateItemQuantity(event, index) {
      const itemIndex = Math.abs(index + 1 - this.cartItems.length);
      this.$store.dispatch("search/updateItemQuantity", {
        quantity: event,
        index: itemIndex
      });
    },

    // TAB 2
    submitNewAddressForm() {},

    // TAB 3
    makePayment() {}
  }
};
</script>

<style lang="scss" scoped>
#search-checkout-demo {
  .item-view-primary-action-btn {
    color: #2c2c2c !important;
    background-color: #f6f6f6;
  }

  .item-name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
  }

  .vue-form-wizard {
    ::v-deep .wizard-header {
      padding: 0;
    }

    ::v-deep .wizard-tab-content {
      padding-right: 0;
      padding-left: 0;
    }
  }
}
</style>
