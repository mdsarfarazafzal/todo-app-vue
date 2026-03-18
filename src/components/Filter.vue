<script setup>
const props = defineProps({
    action: String
});
const emit = defineEmits(['toggleFilter']);
function toggleFilter() {
    emit('toggleFilter', props.action.toLowerCase());
}
</script>
<template>
    <button @click="toggleFilter"
        class="bg-transparent text-slate-300 border border-slate-300 font-semibold p-2 rounded-lg cursor-pointer">
        {{ action }}
    </button>
</template>