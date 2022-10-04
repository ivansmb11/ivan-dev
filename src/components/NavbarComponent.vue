<script>
import { collapsed, toggleNavbar, navbarWidth } from './state'
import NavbarLinks from './NavbarLinks.vue'
export default {
  props: {},
  components: { NavbarLinks },
  setup() {
    return {
      collapsed,
      toggleNavbar,
      navbarWidth
    }
  },
}
</script>

<template>
<div class="sidebar" :style="{ width: navbarWidth }">
  <h1>
    <span v-if="collapsed">
      <div>I</div>
      <div>M</div>
    </span>
    <span v-else>Ivan Mendoza</span>
  </h1>

  <NavbarLinks to="/" icon="fa-solid fa-house">Home</NavbarLinks>
  <NavbarLinks to="/about" icon="fa-solid fa-address-card">About</NavbarLinks>
  <NavbarLinks to="/stack" icon="fa-solid fa-cubes">Stack</NavbarLinks>
  <NavbarLinks to="/portfolio" icon="fa-solid fa-folder-open">Porfolio</NavbarLinks>

  <span 
  class="collapse-icon"
  :class="{ 'rotate-180': collapsed }"
  @click="toggleNavbar"
  >
    <i class="fas fa-angle-double-left"></i>
  </span>
</div>
</template>

<style>
.no-style {
  text-decoration: none;
  color: #ffffff;
}

:root {
  --sidebar-bg-color: #010431b3;
  --sidebar-item-hover: #010754;
  --sidebar-item-active: #000214;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}
.sidebar h1 {
  height: 2.5em;
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>