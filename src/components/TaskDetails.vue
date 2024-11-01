<template>
    <div class="task-details">
        <h2>Details for Task: {{ task.title }}</h2>
        <p>{{ task.info }}</p>
        <p><strong>Status:</strong> {{ task.done ? "Completed" : "Incomplete" }}</p>
    </div>
</template>

<script>
import { useTaskStore } from '../stores/taskStore';

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
    }
};
</script>

<style scoped>
.task-details {
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 8px;
}
</style>
