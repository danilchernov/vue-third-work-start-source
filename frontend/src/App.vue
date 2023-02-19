<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import { AppLayout } from "./layouts";
import {
  useTasksStore,
  useColumnsStore,
  useUsersStore,
  useCommentsStore,
} from "./stores";

const tasksStore = useTasksStore();
const usersStore = useUsersStore();
const columnsStore = useColumnsStore();
const commentsStore = useCommentsStore();

void tasksStore.fetchTasks();
void usersStore.fetchUsers();
void columnsStore.fetchColumns();
void commentsStore.fetchComments();
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
