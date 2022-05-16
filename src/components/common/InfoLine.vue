<template>
  <div>
    <div class="name-container">
      <slot name="name"></slot>
      <slot name="icon"></slot>
    </div>
    <hr
      style="width:86vw; height:1px; border:none; background-color:rgb(245, 109, 145);"
    />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sunflower:wght@300&display=swap');
.name-container {
  margin: 0 auto;
  width: 86vw;
  display: flex;
  justify-content: space-between;
}
h2 {
  margin: 0;
  font-family: 'Sunflower', sans-serif;
  font-size: 1.6em;
  color: rgb(245, 109, 145);
  display: inline-block;
  /* width: 86vw; */
}
i {
  font-size: 2em;
  color: rgb(245, 109, 145);
}
</style>
