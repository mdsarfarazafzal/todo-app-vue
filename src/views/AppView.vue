<script setup>
import Filter from '@/components/Filter.vue';
import TaskInput from '@/components/TaskInput.vue';
import Todo from '@/components/Todo.vue';
import { useSync } from '@/services/TodoServices';
import { useNotificationStore } from '@/stores/NotificationStore';
import { useUserStore } from '@/stores/UserStore';
import { inject, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const user = JSON.parse(localStorage.getItem("user"));
const tasks = ref([]);
const router = useRouter();
const filter = ref('all');
const isAll = ref(true);
const isPending = ref(false);
const isCompleted = ref(false);
const logger = inject('logger');
const query = ref('');

const { addNotification } = useNotificationStore();

const userStore = useUserStore();


tasks.value = user.todos;
function addTask(newTask) {
    // logger.table(userStore.getUser);
    if (newTask.trim()) {
        const newAddTask = {
            id: Date.now(),
            text: newTask,
            isEditing: false,
            completed: false,
            createdAt: new Date()
        }
        tasks.value.unshift(newAddTask);
        addNotification("Task Added!");
        save();
    }

}
function deleteTask(id) {
    tasks.value = tasks.value.filter((task) => task.id !== id);
    save();
}
function toggleTask(id) {
    tasks.value = tasks.value.map((task) => task.id === id ? { ...task, completed: !task.completed } : task);
    save();
}

function toggleEdit(id) {
    tasks.value = tasks.value.map((task) => task.id === id ? { ...task, isEditing: !task.isEditing } : task);
}

function saveEdit(values) {
    if (values[1].trim()) {
        tasks.value = tasks.value.map((task) => task.id === values[0] ? { ...task, isEditing: false, text: values[1] } : task);
        save();
    }
}

function clearCompleted() {
    tasks.value = tasks.value.filter((task) => !task.completed);
    save();
}

function logout() {
    logger.info("Logging out...");
    localStorage.removeItem("user");
    router.push('/login');
    logger.success("User logged out.");
    userStore.logout();
}

async function save() {
    localStorage.setItem("user", JSON.stringify({ ...user, todos: tasks.value }));
    const res = await useSync(JSON.parse(localStorage.getItem("user")));
    if (res.success) {
        // console.table(res);
        logger.table(res);
        logger.success("Todos synced successfully!");
    } else {
        // console.log(res);
        logger.error("Todos syncing failed");
    }
}

// watch(tasks, async () => {
//     localStorage.setItem("user", JSON.stringify({ ...user, todos: tasks.value }));
//     const res = await synctodos(JSON.parse(localStorage.getItem("user")));
//     if (res.success) {
//         console.table(res);
//     } else {
//         console.log(res);
//     }
// })

function pendingTasks() {
    return tasks.value.filter((task) => !task.completed).length;
}

const filterObj = {
    all: () => {
        isAll.value = true;
        isPending.value = false;
        isCompleted.value = false;
        return tasks.value;
    },
    pending: () => {
        isAll.value = false;
        isPending.value = true;
        isCompleted.value = false;
        return tasks.value.filter((task) => !task.completed);
    },
    completed: () => {
        isAll.value = false;
        isPending.value = false;
        isCompleted.value = true;
        return tasks.value.filter((task) => task.completed);
    },
    searching: () => {
        isAll.value = false;
        isPending.value = false;
        isCompleted.value = false;
        return tasks.value.filter((task) => task.text.toLowerCase().includes(query.value.toLowerCase()));

    }
}

watch(query, () => {
    if (!query.value) {
        filter.value = 'all';
    } else {
        filter.value = 'searching';
    }
})

function filteredTasks() {

    // if (filter.value === 'all') {
    //     isAll.value = true;
    //     isPending.value = false;
    //     isCompleted.value = false;
    //     return tasks.value;
    // }
    // else if (filter.value === 'pending') {
    //     isAll.value = false;
    //     isPending.value = true;
    //     isCompleted.value = false;
    //     return tasks.value.filter((task) => !task.completed);
    // } else {
    //     isAll.value = false;
    //     isPending.value = false;
    //     isCompleted.value = true;
    //     return tasks.value.filter((task) => task.completed);
    // }
    // return filter.value === 'all' ? filterObj.all() : filter.value === 'pending' ? filterObj.pending() : filterObj.completed();

    return filterObj[filter.value]();
}

function toggleFilter(action) {
    filter.value = action;
}

</script>
<template>
    <div class="flex min-h-screen flex-col justify-center items-center bg-slate-100 p-4">
        <div class="bg-neutral-50 p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
            <header class="mb-8">
                <h1 class="text-gray-800 text-3xl font-bold text-center">My Tasks</h1>
            </header>
            <TaskInput @on-submit="addTask" />

            <input v-model="query" type="text" placeholder="Search for a task..."
                class="w-full py-3 px-4 mb-4 rounded-4xl text-center bg-white border-2 border-gray-200 focus:border-gray-800 focus:outline-none transition-all font-medium text-gray-700" />

            <div class="flex gap-3 mb-4">
                <div :class='isAll ? "bg-gray-800 rounded-lg" : ""'>
                    <Filter action="All" @toggle-filter="toggleFilter" />
                </div>
                <div :class='isPending ? "bg-gray-800 rounded-lg" : ""'>
                    <Filter action="Pending" @toggle-filter="toggleFilter" />
                </div>
                <div :class='isCompleted ? "bg-gray-800 rounded-lg" : ""'>
                    <Filter action="Completed" @toggle-filter="toggleFilter" />
                </div>
            </div>
            <TransitionGroup name="list" tag="ul"
                class="max-h-80 flex flex-col gap-3 overflow-y-auto overflow-x-hidden pr-2">
                <li v-for="task in filteredTasks()" :key="task.id">
                    <Todo :task="task" @deleteTask="deleteTask" @toggle-task="toggleTask" @toggle-edit="toggleEdit"
                        @save-edit="saveEdit" />
                </li>
            </TransitionGroup>
            <div v-if="!filteredTasks().length" class="text-center py-10">
                <p class="text-slate-500 font-medium">
                    No tasks found. Start by adding one!
                </p>
            </div>

            <footer class="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                <button @click="clearCompleted"
                    class="text-sm cursor-pointer font-bold text-slate-500 hover:text-green-500 transition-colors">
                    Clear Checked
                </button>
                <button @click="logout"
                    class="text-sm cursor-pointer font-bold text-slate-500 hover:text-red-600 transition-colors">
                    Logout
                </button>
                <div class="text-xs font-bold text-slate-400 uppercase">
                    {{ pendingTasks() }} Tasks Pending
                </div>

            </footer>
        </div>
    </div>
</template>
<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>