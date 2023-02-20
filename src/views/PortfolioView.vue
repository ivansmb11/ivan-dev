<template>
<div class="container mw-100 vh-100">
  <PortfolioItem v-for="item in items" />
</div>
</template>

<script>
import PortfolioItem from '../components/PortfolioItem.vue';

export default {
  components: {
    PortfolioItem
  },
  data: {
    items: [
      {
        title: "",
      }
    ]
  },
  methods: {
    fillItemsArray() {

    }
  },
  created() {
    
  },
}
</script>

<style>

</style>