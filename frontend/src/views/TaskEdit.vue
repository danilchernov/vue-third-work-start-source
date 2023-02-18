<template>
  <task-card-creator
    v-if="task"
    :task-to-edit="task"
    @edit-task="($event) => $emit('editTask', $event)"
    @delete-task="($event) => $emit('deleteTask', $event)"
  />
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { createNewDate } from "../common/helpers";
import { useTasksStore } from "@/stores";
import TaskCardCreator from "../modules/tasks/components/TaskCardCreator.vue";

const route = useRoute();
const router = useRouter();
const tasksStore = useTasksStore();

const task = tasksStore.tasks.find((task) => +task.id === +route.params.id);

if (task) {
  const taskDate = task.dueDate;
  task.dueDate = taskDate ? new Date(taskDate) : createNewDate();
} else {
  router.push("/");
}
</script>
