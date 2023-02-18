import { defineStore } from "pinia";
import columns from "@/mocks/columns.json";
import { uniqueId } from "lodash";

export const useColumnsStore = defineStore("columns", {
  state: () => ({
    columns: [],
  }),
  getters: {},
  actions: {
    async fetchColumns() {
      this.columns = columns;
    },
    addColumn() {
      this.columns.push({ id: uniqueId("column_"), title: "Новый столбец" });
    },
    updateColumn(column) {
      const index = this.columns.findIndex(({ id }) => id === column.id);

      if (~index) {
        this.columns.splice(index, 1, column);
      }
    },
    deleteColumn(id) {
      this.columns = this.columns.filter((column) => column.id !== id);
    },
  },
});
