<script setup>
import { ref } from 'vue';

const emit = defineEmits(['onSubmit']);
const newTask = ref('');
function addTask(e) {
    e.preventDefault();
    emit('onSubmit', newTask.value);
    newTask.value = '';
}
</script>
<template>
    <form class="mb-4" @submit="addTask">
        <div class="flex gap-3">
            <input v-model="newTask" type="text" placeholder="Add a new task..."
                class="w-full py-3 px-4 bg-white border-b-2 border-gray-200 focus:border-gray-800 focus:outline-none transition-all font-medium text-gray-700" />
            <button type="submit" class="bg-gray-800 text-neutral-50 p-2 rounded-lg hover:scale-105 cursor-pointer">
                Add
            </button>
        </div>
    </form>
</template>