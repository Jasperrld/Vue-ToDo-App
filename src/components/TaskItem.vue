<template>
    <li :class="['task-item', { done: task.done }]">
        <slot>
            <div v-if="!task.editing" class="task-content">
                <strong>{{ task.title }}</strong>
                <p v-if="task.info">{{ task.info }}</p>
            </div>

            <div v-else class="edit-task">
                <input v-model="task.title" placeholder="Edit task title" class="task-input" />
                <input v-model="task.info" placeholder="Add/edit task details" class="task-input" />
            </div>
        </slot>

        <div class="task-buttons">
            <button v-if="!task.editing" @click="toggleTask" class="complete-btn">
                {{ task.done ? 'Undo' : 'Complete' }}
            </button>
            <!-- <button v-if="!task.editing" @click="editTask" class="edit-btn">Edit</button> -->
            <button v-if="!task.editing" @click="navigateToEdit(index)" class="edit-btn">Edit</button>

            <button v-if="task.editing" @click="saveTask" class="save-btn">Save</button>
            <button @click="deleteTask" class="delete-btn">Delete</button>
        </div>
    </li>
</template>

<script>
import { useTaskStore } from '../stores/taskStore'; 
import { useRouter } from 'vue-router'; 

export default {
    props: {
        index: {
            type: Number,
            required: true
        },
    },
    setup() {
        const router = useRouter(); // Initialize the router here
        const taskStore = useTaskStore();

        const navigateToEdit = (index) => {
            router.push({ name: 'EditTask', params: { index } }); // Navigate to the EditTask route
        };

        return {
            taskStore,
            navigateToEdit,
        };
    },
    computed: {
        task() {
            const taskStore = useTaskStore();
            return taskStore.tasks[this.index]; // Get the task from the store
        },
    },
    methods: {
        toggleTask() {
            const taskStore = useTaskStore();
            taskStore.toggleTask(this.index); // Toggle the task's done state
        },
        deleteTask() {
            const taskStore = useTaskStore();
            taskStore.deleteTask(this.index); // Delete the task
        },
     
        editTask() {
            this.task.editing = true; // Set editing state to true
        },
        saveTask() {
            const taskStore = useTaskStore();
            this.task.editing = false; // Exit editing mode
            taskStore.saveToLocalStorage(); // Ensure tasks are saved to local storage
        },
    }
};
</script>

<style scoped>
.done {
    text-decoration: line-through;
    color: green;
}

.todo-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.task-input {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
}

.add-task-button {
    padding: 10px 20px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
}

.task-list {
    list-style-type: none;
    padding: 0;
}

.task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 10px 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.edit-task {
    flex: 1;
}

.task-content {
    font-size: 18px;
}

.task-content p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
}

.task-buttons button {
    margin-left: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

.complete-btn {
    background-color: #ffc107;
    border: none;
    color: #fff;
}

.edit-btn {
    background-color: #007bff;
    border: none;
    color: #fff;
}

.save-btn {
    background-color: #17a2b8;
    border: none;
    color: #fff;
}

.delete-btn {
    background-color: #dc3545;
    border: none;
    color: #fff;
}
</style>
