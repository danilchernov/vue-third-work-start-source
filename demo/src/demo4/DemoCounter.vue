<template>
	<div class="counter">
		<CounterButton @action="counterStore.decrement" :disabled="counterStore.isDecrementDisabled">-</CounterButton>

		<CounterValue :value="counterStore.value" />

		<CounterButton @action="counterStore.increment">+</CounterButton>
	</div>
</template>

<script setup>
import { useCounterStore } from "./store";

import CounterButton from "./CounterButton.vue";
import CounterValue from "./CounterValue.vue";

const counterStore = useCounterStore();
</script>

<style lang="scss" scoped>
.counter {
	display: flex;
	align-items: center;
}
</style>
