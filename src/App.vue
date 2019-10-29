<template>
  <div id="app">
    <TasksContainer />
  </div>
</template>

<script>
import TasksContainer from './components/TasksContainer.vue'

export default {
  name: 'app',
  components: {
    TasksContainer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
