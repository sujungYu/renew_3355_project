<template>
  <div>
    <page-name> <i class="fa-solid fa-arrow-right-from-bracket out" @click="out"></i>삼삼오오</page-name>
    <div>
      <i class="fa-solid fa-circle-plus plus" @click="addBulletin"></i>
    </div>
<i class="fa-solid fa-circle-plus plus" @click="addBulletin"></i>
  </div>
</template>

<script>
import PageName from '../components/common/PageName.vue'
export default {
  components: { PageName },

}
</script>

<style>

</style>