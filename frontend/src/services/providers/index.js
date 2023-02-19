import { useAuthStore } from "@/stores";
import FetchProvider from "./FetchProvider";

const httpProvider = new FetchProvider();

httpProvider.addInterceptor({
  onError: async (status) => {
    if (status === 401) {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated) await authStore.logout();
    }
  },
});

export default httpProvider;
