import { defineStore } from "pinia";
import users from "@/mocks/users.json";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
  }),
  getters: {},
  actions: {
    async fetchUsers() {
      this.users = users;
    },
  },
});
