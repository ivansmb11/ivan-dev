import { ref, computed } from 'vue';

export const collapsed = ref(false);
export const toggleNavbar = () => {
  collapsed.value = !collapsed.value;
}

export const SIDEBAR_WIDTH = 180;
export const SIDEBAR_WIDTH_COLLAPSED = 50;
export const navbarWidth = computed(() => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`);


export const getImagePath = computed(() => {
  return (path) => {
    switch (path) {
      case '/': './assets/home.jpg';
      case '/about': './assets/about.jpg';
      case '/stack': './assets/stack.jpg';
      case '/portfolio': './assets/portfolio.jpg';
    }
  }
})