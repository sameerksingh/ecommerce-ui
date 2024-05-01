<template>
  <v-container v-if="userId">
    <v-row>
      <v-col>
        <v-data-table :items="productsInCart" :headers="headers" hide-default-footer>
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.price }}</td>
            <td>{{ props.item.quantity }}</td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row v-if="productsInCart && productsInCart.length > 0">
      <v-col>
        <v-btn @click="clearCart(userId)">Clear Cart</v-btn>
      </v-col>
      <v-col>
        <v-btn @click="showPopup = true">Place Order</v-btn>
      </v-col>
    </v-row>
    <PopUp
      :title="'Are you sure you want to place this order'"
      :showPopup="showPopup"
      :actionName="'Confirm'"
      :actionHandler="confirmAction"
      @close="showPopup = false"
    >
      <!-- Popup Content -->
      <div>
        <template v-for="(product, index) in productsInCart">
          <div :key="index">
            {{ index }}.  {{ product.name }} (Price: {{ product.price }}, Quantity: {{ product.quantity }})
          </div>
        </template>
        <div>Bill: {{ amount }}</div>
      </div>
    </PopUp>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PopUp from '@/components/PopUp.vue'
export default {
  // eslint-disable-next-line 
  name: "Cart",
  components: {
    PopUp
  },
  data() {
      return {
        userId: null,
        showPopup: false,
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Price', value: 'price' },
          { text: 'Quantity', value: 'quantity' }
        ],
      };
    },
    computed: {
        ...mapGetters('cart', ['cartProducts']),
        ...mapGetters('auth', ['getUser']),
        ...mapGetters('product', ['getProducts']),
        isProductInCart() {
            return product => this.cartProducts.some(item => item.id === product.id)
        },
        productsInCart() {
          const productsInCart = []

          this.cartProducts.forEach((cartProduct) => {
            const productDetails = this.getProducts.find((product) => product.id === cartProduct.id)

            if (productDetails) {
              productsInCart.push({
                id: productDetails.id,
                name: productDetails.name,
                price: productDetails.price,
                quantity: cartProduct.quantity
              });
            }
          })
          return productsInCart
        },
        amount() {
          let money = 0
          this.productsInCart.forEach((product) => {
            money += product.quantity * product.price
          })
          return money
        }
    },
    watch: {
        getUser: {
            immediate: true, // Trigger the watcher immediately on component mount
            handler(newUserValue) {
                // Update the userId variable
                this.userId = newUserValue?.id;
                },
        },
    },
    mounted() {
      this.fetchProducts()
      this.fetchCartProducts(this.userId)
    },
    methods: {
      ...mapActions('product', ['fetchProducts']),
      ...mapActions('cart', ['fetchCartProducts', 'clearCart']),
      ...mapActions('order', ['placeOrder']),
      confirmAction() {
        this.placeOrder(this.userId)
        this.fetchCartProducts(this.userId)
        this.showPopup = false
      },
    },
  };
</script>

<style scoped>
/* Add scoped CSS styles */
</style>
