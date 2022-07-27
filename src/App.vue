<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import { navbarWidth } from '@/components/state.js'
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { watch } from 'vue';

export default {
  components: { NavbarComponent },
  setup() {
    const route = useRoute();
    const currentRoute = computed(() => {
      const { path } = route;
      switch (path) {
        case '/':
          return '/home.jpg';
        case '/about':
          return '/about.jpg';
        case '/stack':
          return '/stack.jpg';
        default:
          return '/portfolio.jpg';
      }
    });
    watch(currentRoute, (curr, old) => {
      if (curr !== old) {
        console.log(currentRoute.value);
      }
    });
    return {
      navbarWidth,
      currentRoute
    }
  },
}

</script>

<template>
<div class="container" :style="{ 'background-image': 'url(./assets'+currentRoute+');' }">
  <NavbarComponent />
  <div :style="{ 'margin-left': navbarWidth }">
    <router-view />
  </div>
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
