<template>
    <div class="popup-overlay" v-if="showPopup">
      <div class="popup">
        <!-- Header -->
        <div class="popup-header">{{ title }}</div>
  
        <!-- Content Slot -->
        <div class="popup-content">
          <slot></slot>
        </div>
  
        <!-- Action Buttons -->
        <div class="popup-actions">
          <v-btn @click="closePopup">Cancel</v-btn>
          <v-btn @click="performAction">{{ actionName }}</v-btn>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PopUp",
    props: {
      title: String, // Title for the popup
      showPopup: Boolean, // Flag to control visibility of the popup
      actionName: String, // Name for the action button
      actionHandler: Function // Function to handle the action button click
    },
    methods: {
      closePopup() {
        this.$emit('close'); // Emit 'close' event to parent component
      },
      performAction() {
        this.actionHandler(); // Call the action handler function
      }
    }
  };
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup {
    background-color: white;
    border-radius: 5px;
    padding: 20px;
  }
  
  .popup-header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .popup-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .popup-actions button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .popup-actions button:hover {
    background-color: #f0f0f0;
  }
  </style>
  