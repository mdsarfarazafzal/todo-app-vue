import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useNotificationStore = defineStore("notifications", () => {
  const notifications = ref([]);

  const getNotifications = computed(() => notifications);

  function addNotification(msg) {
    const id = Date.now();
    notifications.value.push({ id, message: msg });
    setTimeout(() => {
      removeNotification(id);
    }, 3000);
  }

  function removeNotification(id) {
    notifications.value = notifications.value.filter(
      (notification) => notification.id !== id,
    );
  }

  return { getNotifications, addNotification, removeNotification };
});
