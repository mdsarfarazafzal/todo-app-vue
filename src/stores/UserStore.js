import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);

  const getUser = computed(() => user.value);

  const login = (userData) => {
    user.value = userData;
  };

  const logout = () => {
    user.value = null;
  };

  return {
    user,
    getUser,
    login,
    logout,
  };
});