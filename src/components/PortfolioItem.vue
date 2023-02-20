<template>
  <div class="row">
    <div class="col">
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    link: { type: string, required: true },
    imagePath: { type: string, required: true },
    title: { type: string, required: true },
    description: { type: string, required: true }
  }
}
</script>