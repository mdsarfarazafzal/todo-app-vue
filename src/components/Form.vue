<script setup>
import { ref } from 'vue';

defineProps({ greeting: String, action: String, suggestion: String, redirection: String, redirectionLink: String, error: Boolean })
const emit = defineEmits(['onSubmit']);
const email = ref("");
const password = ref("");
function onSubmit(e) {
    e.preventDefault();
    emit('onSubmit', { email: email.value, password: password.value });
    email.value = "";
    password.value = "";
}
</script>
<template>
    <div class="flex justify-center items-center h-screen">
        <div class="bg-neutral-50 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 class="text-gray-800 text-3xl font-bold mb-6 text-center">{{ greeting }}</h2>
            <form @submit="onSubmit">
                <div class="flex flex-col gap-5">
                    <div>
                        <label for="reg-email" class="text-sm font-medium text-gray-700">Email*</label>
                        <input v-model="email" type="email" id="reg-email"
                            class="w-full py-2 border-b border-gray-300 focus:border-gray-500 focus:outline-none"
                            placeholder="Enter your email" />
                    </div>
                    <div>
                        <label for="reg-password" class="text-sm font-medium text-gray-700">Password*</label>
                        <input v-model="password" type="password" id="reg-password"
                            class="w-full py-2 border-b border-gray-300 focus:border-gray-500 focus:outline-none"
                            placeholder="Enter your password" />
                    </div>

                    <div>
                        <p v-if="error" class="text-sm text-center text-red-600 mb-2">
                        <p v-if="action === 'Register'">Registration Failed</p>
                        <p v-else>Login Failed</p>
                        </p>
                        <button id="register-btn" type="submit"
                            class="w-full cursor-pointer font-semibold text-lg bg-gray-800 text-neutral-50 py-2 rounded hover:scale-105 transition">
                            {{ action }}
                        </button>
                    </div>
                </div>
            </form>
            <p class="text-center text-sm text-gray-600 mt-4">
                {{ suggestion }}
                <RouterLink :to="redirectionLink">
                    <span class="text-gray-800 font-medium cursor-pointer hover:underline">{{ redirection }}</span>
                </RouterLink>
            </p>
        </div>
    </div>
</template>