<template>
    <div>
      <button class="box" ref="box" @click="toggleInfo">{{ info }}</button>
      <div v-if="showInfo" class="tooltip" :style="tooltipStyle">
        <!-- Render the provided component when showInfo is true -->
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
        info: {
            type: String,
            required: true
        }
    },
    data() {
      return {
        showInfo: false  // Initially, the info is not shown
      };
    },
    methods: {
      toggleInfo() {
        // Toggle the value of showInfo
        this.showInfo = !this.showInfo;
        if (this.showInfo) {
            this.calculateTooltipPosition();
        }
      },
        calculateTooltipPosition() {
        const boxRect = this.$refs.box.getBoundingClientRect();
        this.tooltipStyle = {
            top: `${boxRect.top - 200}px`,
            left: `${boxRect.width + 150}px`, // Adjust as needed
            width: '250px'
        };
        }
    }
  }
  </script>
  
<style>
.box {
    color: maroon;
    font-size: 12px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode';
    justify-content: center;
    cursor: pointer;
}
.tooltip {
    opacity: 0.65;
    font-size: 12px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode';
    position: absolute;
    z-index: 9999;
    background-color: #333;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>