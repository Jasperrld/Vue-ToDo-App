<script>
import TodoList from './components/TodoList.vue'

export default {
  components: {
    TodoList
  }
}
</script>


<template>
  <div class="app">
    <h1>My To-Do List</h1>
    <!-- <todo-list></todo-list> -->
    <router-view></router-view> 

  </div>
</template>
