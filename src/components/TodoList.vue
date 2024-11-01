<template>
    <div class="todo-container">
        <input v-model="newTask.title" placeholder="Add new task" class="task-input" />
        <button @click="addTask" class="add-task-button">Add Task</button>

        <button @click="toggleShowCompleted" class="toggle-btn">
            {{ showCompleted ? 'Hide Completed' : 'Show Completed' }}
        </button>

        <ul class="task-list">
            <task-item 
                v-for="(task, index) in taskStore.filteredTasks(showCompleted)" 
                :key="index" 
                :task="task" 
                :index="index" 
                @toggle-task="taskStore.toggleTask" 
                @delete-task="taskStore.deleteTask">
                <div v-if="!task.editing" class="task-content">
                    <strong>Task: {{ task.title }}</strong>
                    <p v-if="task.info">{{ task.info }}</p>
                </div>
            </task-item>
        </ul>
    </div>
</template>

<script>
import { useTaskStore } from '../stores/taskStore';
import TaskItem from './TaskItem.vue';

export default {
    components: {
        TaskItem
    },
    data() {
        return {
            newTask: {
                title: '',
                info: ''
            },
            showCompleted: true 
        };
    },
    setup() {
        const taskStore = useTaskStore();
        return { taskStore };
    },
    methods: {
        addTask() {
            if (this.newTask.title) {
                this.taskStore.addTask({ ...this.newTask });
                this.newTask.title = '';
                this.newTask.info = '';
            }
        },
        toggleShowCompleted() {
            this.showCompleted = !this.showCompleted;
        }
    }
};
</script>
<style scoped>
.toggle-btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
}
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
