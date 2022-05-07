<template>
  <div>
      <page-name><i class="fas fa-times out" @click="cancel"></i>회원가입</page-name>
      <signup-form></signup-form>
  </div>
</template>

<script>
import PageName from '@/components/common/PageName.vue'
import SignupForm from '@/components/SignupForm.vue'
export default {
  components: { PageName, SignupForm },
  methods: {
      cancel() {
          this.$router.replace('./login');
      }
  }
}
</script>

<style>
.out {
  position: absolute;
  left: 10vw;
  font-size: 3.2rem;
}
</style>