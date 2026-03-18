<script setup>
import { useRegister } from '@/services/UserServices';
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import Form from '@/components/Form.vue';
import { useNotificationStore } from '@/stores/NotificationStore';
const error = ref(false);
const router = useRouter();
const { addNotification } = useNotificationStore();
const logger = inject('logger');

const onSubmit = async (user) => {
    logger.info("Registering...");
    const res = await useRegister(user);
    if (res.success) {
        logger.table(res.data);
        logger.success("User Registered!");
        // toast('Registered Successfully!');
        addNotification("Registered Successfully!");
        error.value = false;
        router.push('/login');
    } else {
        logger.error("Registration Failed");
        logger.warn("Enter valid credentials!");
        error.value = true;
    }
}
</script>
<template>
    <Form greeting="Welcome" action="Register" suggestion="Already have an account?" redirection="Login here"
        redirection-link="/login" :error="error" @on-submit="onSubmit($event)" />
</template>