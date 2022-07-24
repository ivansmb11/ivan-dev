<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import { navbarWidth } from '@/components/state.js'

export default {
  components: { NavbarComponent },
  setup() {
    return {
      navbarWidth
    }
  },
}

</script>

<template>
<NavbarComponent />
<div :style="{ 'margin-left': sidebarWidth }">
    <router-view />
</div>
</template>

<style>
#app {
  font-family: 'JetBrains Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
