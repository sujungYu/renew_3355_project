<template>
  <div>
    <slot name="title"></slot>
    <slot name="icon" class="icon"></slot>
    <i class="fa fa-pencil pencil"></i>
    <hr
      style="width:88vw; height:2px; border:none; background-color:rgb(245, 109, 145);"
    />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sunflower:wght@300&display=swap');
div {
  margin: 2.3vh auto;
}
h1 {
  width: 100vw;
  display: inline-block;
  margin: 0 auto;
  margin-bottom: -1vh;
  text-align: center;
  font-family: 'Sunflower', sans-serif;
  font-size: 3.6rem;
  color: rgb(245, 109, 145);
}
hr {
  position: relative;
  margin: 0 auto;
}
.pencil {
  margin-top: 16px;
  left: 80vw;
  position: absolute;
  font-size: 2.4rem;
  color: rgb(245, 109, 145);
}
i {
  color: rgb(245, 109, 145);
  position: absolute;
  left: 10vw;
  font-size: 3.2rem;
}
</style>
