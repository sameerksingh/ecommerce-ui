<template>
  <v-container v-if="userId">
    <v-data-table :items="ordersWithSno" :headers="headers" :sort-by="sortBy" :sort-desc="sortDesc" hide-default-footer>
      <template v-slot:item="{item}">
        <tr class="custom-row">
          <td>{{ item.sno }}</td>
          <td>{{ item.bill }}</td>
          <td>
            <template v-for="(product, index) in item.products">
              <div :key="index">
                <p>{{ product.name }} (Price: {{ product.price }}, Quantity: {{ product.quantity }})</p>
              </div>
            </template>
          </td>
          <td>{{ formatDate(item.timestamp) }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  // eslint-disable-next-line 
  name: "Orders",
  data() {
      return {
        userId: null,
        headers: [
          { text: 'S No.', value: 'sno', sortable: true},
          { text: 'Bill', value: 'bill', sortable: true},
          { text: 'Products', value: 'products', sortable: false},
          { text: 'Order placed on', value: 'timestamp', sortable: true },
          { text: 'Status', value: 'status', sortable: true }
        ],
        sortBy: 'sno',
        sortDesc: false, 
      };
    },
    computed: {
        ...mapGetters('order', ['orders']),
        ...mapGetters('auth', ['getUser']),
        ordersWithSno() {
          return this.orders.map((d, index) => ({ ...d, sno: index + 1 }))
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
        this.fetchOrders(this.userId)
    },
    methods: {
      ...mapActions('order', ['fetchOrders']),
      formatDate(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleString()
      },
    },
  };
</script>

<style scoped>
  .custom-row {
    border-bottom: 2px solid #ccc;
  }
</style>
