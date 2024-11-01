<template>
    <div class="edit-task">
        <input v-model="task.title" placeholder="Edit task title" class="task-input" />
        <input v-model="task.info" placeholder="Add/edit task details" class="task-input" />
        <button @click="saveTask" class="save-btn">Save</button>
        <button @click="cancelEditing" class="cancel-btn">Cancel</button> 
        <router-link :to="{ name: 'TaskDetails', params: { index: task.index }}">View Task Details</router-link>
        <router-view></router-view>

    </div>
</template>

<script>
import { useTaskStore } from '../stores/taskStore';
import { useRouter } from 'vue-router'; 

export default {
    props: {
        index: {
            type: Number,
            required: true
        }
    },
    computed: {
        task() {
            const taskStore = useTaskStore();
            return taskStore.tasks[this.index]; 
        }
    },
    setup(props) {
        const taskStore = useTaskStore();
        const router = useRouter(); 

        const saveTask = () => {
            taskStore.saveToLocalStorage(); 
            router.push('/'); 
        };

        const cancelEditing = () => {
            router.push('/'); 
        };

        return {
            saveTask,
            cancelEditing
        };
    }
};
</script>

<style scoped>
.edit-task {
    flex: 1;
    width: 500px;
}

.task-input {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
}

.save-btn {
    padding: 10px 20px;
    background-color: #17a2b8;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.cancel-btn {
    padding: 10px 20px;
    background-color: #dc3545; 
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px; 
}
</style>
