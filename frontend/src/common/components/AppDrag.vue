<template>
  <div
    :draggable="authStore.isAuthenticated"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores";
import { DATA_TRANSFER_PAYLOAD, MOVE } from "../constants";

const authStore = useAuthStore();

const props = defineProps({
  transferData: {
    type: Object,
    required: true,
  },
});

function onDrag({ dataTransfer }) {
  dataTransfer.effectAllowed = MOVE;
  dataTransfer.dropEffect = MOVE;
  dataTransfer.setData(
    DATA_TRANSFER_PAYLOAD,
    JSON.stringify(props.transferData)
  );
}
</script>
