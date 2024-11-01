import { createRouter, createWebHistory } from 'vue-router';
import TodoList from '../components/TodoList.vue';
import EditTask from '../components/EditTask.vue';
import NotFound from '../components/NotFound.vue';
import TaskDetails from '../components/TaskDetails.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: TodoList,
    },
    {
        path: '/edit-task/:index',
        name: 'EditTask',
        component: EditTask,
        props: true,
        children: [
            {
                path: 'details',
                name: 'TaskDetails',
                component: TaskDetails,
                props: true,
            }
        ]
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
