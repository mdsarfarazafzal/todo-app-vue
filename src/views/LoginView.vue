<script setup>
import Form from '@/components/Form.vue';
import { useLogin } from '@/services/UserServices';
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/UserStore';
const error = ref(false);
const router = useRouter();
const logger = inject("logger");

const userStore = useUserStore();

const onSubmit = async (user) => {
    logger.info("Logging in...")
    const res = await useLogin(user);
    if (res.success) {
        logger.table(res.data);
        logger.success("User Logged In!");
        localStorage.setItem("user", JSON.stringify(res.data));
        error.value = false;
        router.push('/app');
        userStore.login(res.data);
    } else {
        logger.error("Login Failed");
        logger.warn("Enter valid credentials");
        error.value = true;
    }
}
</script>
<template>
    <Form greeting="Welcome Back" action="Login" suggestion="Don't have an account?" redirection="Register here"
        redirection-link="/register" :error="error" @on-submit="onSubmit($event)" />
</template>