<script setup>
import { ref } from 'vue';

const props = defineProps({ task: Object });
const emit = defineEmits(['deleteTask', 'toggleTask', 'toggleEdit', 'saveEdit']);
const editText = ref(props.task.text);
function deleteTask(id) {
    emit('deleteTask', id);
}
function toggleTask(id) {
    emit('toggleTask', id);
}

function toggleEdit(id) {
    emit('toggleEdit', id);
}

function saveEdit(id) {
    emit('saveEdit', [id, editText.value]);
}

</script>
<template>
    <div v-if="!task.isEditing"
        class="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
        <div class="flex flex-1 items-center gap-3">
            <div @click="toggleTask(task.id)"
                class="min-w-6 min-h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all"
                :class="task.completed
                    ? 'bg-gray-800 border-gray-800'
                    : 'border-slate-300 hover:border-slate-500'
                    "></div>
            <span :class='task.completed ? "line-through text-slate-400" : ""'
                class="text-sm font-medium text-slate-700 transition-all">
                {{ task.text }}
            </span>
        </div>

        <button @click="deleteTask(task.id)" class="text-slate-300 cursor-pointer hover:text-red-500 transition-colors">
            Delete
        </button>
        <button @click="toggleEdit(task.id)"
            class="text-slate-300 cursor-pointer hover:text-slate-500 transition-colors">
            Edit
        </button>
    </div>
    <div v-if="task.isEditing"
        class="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
        <div class="flex flex-1 items-center gap-3">
            <input type="text" name="editText" v-model="editText"
                class="w-full py-1 px-2 rounded-lg bg-white border border-gray-200 focus:border-gray-800 focus:outline-none transition-all font-sm text-gray-700" />
        </div>

        <button @click="saveEdit(task.id)" class="text-slate-500 cursor-pointer hover:text-green-500 transition-colors">
            Save
        </button>
        <button @click="toggleEdit(task.id)" class="text-slate-500 cursor-pointer hover:text-red-500 transition-colors">
            Cancel
        </button>
    </div>
</template>