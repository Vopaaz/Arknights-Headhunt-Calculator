<template>
  <div id="app">
    <main-page />
  </div>
</template>

<script>
import MainPage from "./views/MainPage";

export default {
  name: "App",
  components: {
    MainPage
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 180px;
}
</style>
