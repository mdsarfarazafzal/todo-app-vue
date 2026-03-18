<script setup>
import { useNotificationStore } from '@/stores/NotificationStore';


const { getNotifications, removeNotification } = useNotificationStore();

</script>
<template>
    <TransitionGroup name="list" tag="ul" class="fixed top-5 right-1/3 flex flex-col gap-3">
        <li v-for="notification in getNotifications" :key="notification.id">
            <div
                class="flex items-center w-full max-w-xs p-4 text-body bg-neutral-50 rounded-full shadow-lg border border-gray-300">
                <div class="text-sm font-semibold pr-4 text-gray-800">{{
                    notification.message }}</div>
                <button type="button" @click="removeNotification(notification.id)"
                    class="ms-auto flex items-center justify-center text-gray-400 hover:text-gray-900 bg-transparent rounded-lg text-sm h-8 w-8 hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none">
                    <span class="sr-only">Close</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                </button>
            </div>
        </li>
    </TransitionGroup>
</template>
<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}
</style>