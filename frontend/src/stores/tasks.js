import { defineStore } from "pinia";
import tasks from "@/mocks/tasks.json";
import { normalizeTask } from "../common/helpers";
import { useFiltersStore } from "@/stores/filters";
import { useUsersStore } from "@/stores/users";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    filteredTasks: [],
  }),
  getters: {
    filteredTasks: (state) => {
      const filtersStore = useFiltersStore();

      const filtersAreEmpty = Object.values(filtersStore.filters).every(
        (value) => !value.length
      );

      if (filtersAreEmpty) {
        return state.tasks;
      }

      const searchFilter = (task) =>
        task.title
          .toLowerCase()
          .includes(filtersStore.filters.search.toLowerCase().trim());

      const usersFilter = (task) =>
        filtersStore.filters.users.some((userId) => userId === task.userId);

      const statusesFilter = (task) =>
        filtersStore.filters.statuses.some(
          (el) => el === task.status || el === task.timeStatus
        );

      return state.tasks.filter((task) => {
        let result = {
          search: searchFilter,
          users: usersFilter,
          statuses: statusesFilter,
        };

        return Object.entries(result).every(
          ([key, callback]) =>
            !filtersStore.filters[key].length || callback(task)
        );
      });
    },
    getTaskUserById: () => (id) => {
      const usersStore = useUsersStore();
      return usersStore.users.find((user) => user.id === id);
    },
    sidebarTasks: (state) => {
      return state.filteredTasks
        .filter((task) => !task.columnId)
        .sort((a, b) => a.sortOrder - b.sortOrder);
    },
  },
  actions: {
    async fetchTasks() {
      this.tasks = tasks.map((task) => normalizeTask(task));
    },
    updateTasks(tasksToUpdate) {
      tasksToUpdate.forEach((task) => {
        const index = this.tasks.findIndex(({ id }) => id === task.id);

        if (~index) {
          this.tasks.splice(index, 1, task);
        }
      });
    },
    addTask(task) {
      const newTask = normalizeTask(task);
      newTask.id = this.tasks.length + 1;
      newTask.sortOrder = this.tasks.filter((task) => !task.columnId).length;

      if (newTask.userId) {
        newTask.user = { ...this.getTaskUserById(newTask.userId) };
      }

      this.tasks = [...this.tasks, newTask];
    },
    editTask(task) {
      const index = this.tasks.findIndex(({ id }) => task.id === id);

      if (~index) {
        const newTask = normalizeTask(task);

        if (newTask.userId) {
          newTask.user = { ...this.getTaskUserById(newTask.userId) };
        }

        this.tasks.splice(index, 1, newTask);
      }
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
  },
});
