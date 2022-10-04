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
      const { name } = route;
      return name;
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
<div :class="currentRoute">
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
  color: #42b8838f;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #42b883;
}
#nav a.router-link-exact-active {
  color: #42b983;
}

</style>

<style scoped>
.home {
  background-image: url(./assets/home.jpg);
  background-size: cover;
}
.about {
  background-image: url(./assets/about.jpg);
  background-size: cover;
}
.stack {
  background-image: url(./assets/stack.jpg);
  background-size: cover;
}
.portfolio {
  background-image: url(./assets/portfolio.jpg);
  background-size: cover;
}
</style>
