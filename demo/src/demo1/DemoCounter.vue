<template>
  <div class="counter">
    <CounterButton @action="decrement">-</CounterButton>

    <CounterValue :value="count" />

    <CounterButton @action="increment">+</CounterButton>
  </div>
</template>

<script setup>
import {ref} from 'vue';

import CounterButton from './CounterButton.vue';
import CounterValue from './CounterValue.vue';

const count = ref(0)
const decrement = () => count.value--;
const increment = () => count.value++;

</script>

<style lang="scss" scoped>
.counter {
  display: flex;
  align-items: center;
}
</style>
