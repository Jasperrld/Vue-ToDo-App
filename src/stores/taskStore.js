import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: JSON.parse(localStorage.getItem('tasks')) || []
    }),
    getters: {
        filteredTasks: (state) => (showCompleted) => {
            return showCompleted ? state.tasks : state.tasks.filter(task => !task.done);
        }
    },
    actions: {
        addTask(newTask) {
            this.tasks.push({
                title: newTask.title,
                info: newTask.info,
                done: false,
                editing: false
            });
            this.saveToLocalStorage();
        },
        toggleTask(index) {
            this.tasks[index].done = !this.tasks[index].done;
            this.saveToLocalStorage();
        },
        deleteTask(index) {
            this.tasks.splice(index, 1);
            this.saveToLocalStorage();
        },
        saveToLocalStorage() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }
});
