<template>
<div class="mw-100 vh-100">
  <div class="container">
    <div class="row">
      <h1 class="col mt-5">Hi.</h1>
    </div>
    <div class="row">
      <h2 class="col">Welcome to my personal webpage!</h2>
    </div>
    <div class="row">
      <div class="col mt-5">
        <img src="../assets/me.jpg" class="rounded-circle" alt="">
      </div>
    </div>
    <div class="row align-left">
      <p class="col mt-5 fs-4">My name is <span class="name">Ivan Mendoza</span>, a Junior Full-Stack Software Developer from Sinaloa, México. Currently living in Querétaro, México.</p>
    </div>
    <div class="row mt-3">
      <div class="col">
        <a target="_blank" href="https://www.facebook.com/ivansmb11"><i class="icon fa-brands fa-facebook"></i></a>
      </div>
      <div class="col">
        <a target="_blank" href="https://github.com/ivansmb11"><i class="icon fa-brands fa-github"></i></a>
      </div>
      <div class="col">
        <a target="_blank" href="https://www.linkedin.com/in/iv%C3%A1n-sebasti%C3%A1n-mendoza-baca-078429231/"><i class="icon fa-brands fa-linkedin"></i></a>
      </div>
      <div class="col">
        <a target="_blank" href="https://twitter.com/ivannsmb"><i class="icon fa-brands fa-twitter"></i></a>
      </div>
      <div class="col">
        <a target="_blank" href="mailto:ivan.mendoza32@anahuac.mx"><i class="icon fa-solid fa-envelope"></i></a>
      </div>
    </div>
  </div>
</div>
</template>

<script>

</script>

<style scoped>
h1, h2, p {
  color: #ffffff;
}
.vertical-center {
  margin: 0;
  position: absolute;
  top: 45%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.container {
  width: 65%;
}
.name {
  font-weight: 600;
  text-decoration: underline;
}

.icon {
  font-size: 2.5em;
  color: #ffffff;
}

.icon:hover {
  transition: ease 0.2s;
  color: #ffffff7c;
}

img {
  width: 30%;
  align-items: center;
}
</style>