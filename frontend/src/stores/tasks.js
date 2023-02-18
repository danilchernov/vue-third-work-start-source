import { defineStore } from "pinia";

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
  actions: {},
});
