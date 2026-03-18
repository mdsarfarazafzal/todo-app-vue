<script setup>
import ToastNotification from './components/ToastNotification.vue';

</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
  <ToastNotification />
  <!-- <router-view></router-view> -->
</template>

<style scoped></style>
