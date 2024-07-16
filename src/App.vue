<template>
  <div id="app">
    <nav>
      <div class="nav-container">
        <router-link to="/">Home</router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AppComponent'
}
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

nav {
  background-color: #3498db;
  padding: 10px 0;
  margin-bottom: 20px;
}

.nav-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #ecf0f1;
}
</style>