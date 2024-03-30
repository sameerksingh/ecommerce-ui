<template>
    <v-container v-if="userId">
      <v-row>
        <v-col v-for="product in getProducts" :key="product.id" cols="12" sm="6" md="4">
          <v-card>
            <!-- <v-img :src="product.imageUrl" height="200" contain></v-img> -->
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-subtitle>{{ product.price }}</v-card-subtitle>
            <v-card-actions>
              <v-btn v-if="getQty(product)==0" color="primary" @click="incrementQty(product)">Add to Cart</v-btn>
              <v-btn v-if="isProductInCart(product)" @click="incrementQty(product)">+</v-btn>
              <span v-if="isProductInCart(product)">{{ getQty(product) }}</span>
              <v-btn v-if="isProductInCart(product)" @click="decrementQty(product)">-</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <!-- Clear Cart Button -->
          <button @click="clearCart(userId)">Clear Cart</button>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <!-- Show Cart Button -->
          <router-link to="/cart">Show Cart</router-link>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    // eslint-disable-next-line 
    name: "Home",
    data() {
      return {
        userId: null
      };
    },
    computed: {
        ...mapGetters('cart', ['cartProducts']),
        ...mapGetters('auth', ['getUser']),
        ...mapGetters('product', ['getProducts']),
        isProductInCart() {
            return product => this.cartProducts.some(item => item.id === product.id);
        },
        getQty() {
            return product => {
                const cartItem = this.cartProducts.find(item => item.id === product.id);
            return cartItem ? cartItem.quantity : 0;
            };
        },
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
        ...mapActions('cart', ['fetchCartProducts', 'updateCart', 'clearCart']),
        incrementQty(product) {
            let payload = {
                userId: this.userId,
                product_id: product.id,
                quantity: 1,
            }
            this.updateCart(payload);
        },
        decrementQty(product) {
            let payload = {
                userId: this.userId,
                product_id: product.id,
                quantity: -1,
            }
            this.updateCart(payload);
        },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles as needed */
  </style>
  