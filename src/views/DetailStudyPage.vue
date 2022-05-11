<template>
  <div>
    <page-name>
      <h1 slot="title">게시물</h1>
      <i slot="icon" class="fa-solid fa-arrow-left-long back" @click="back"></i>
    </page-name>
    <detail-study-from></detail-study-from>
  </div>
</template>

<script>
import PageName from '../components/common/PageName.vue';
import DetailStudyFrom from '../components/DetailStudyFrom.vue';
export default {
  components: { PageName, DetailStudyFrom },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
