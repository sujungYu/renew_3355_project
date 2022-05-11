<template>
  <div class="login">
    <div class="title">
      <page-name>
        <h1 slot="title">삼삼오오</h1>
      </page-name>
    </div>
    <login-form></login-form>
  </div>
</template>

<script>
import PageName from '@/components/common/PageName.vue';
import LoginForm from '@/components/LoginForm.vue';
export default {
  components: { PageName, LoginForm },
};
</script>

<style>
.title {
  padding-top: 20vh;
  /* font-size: 4rem; */
}
</style>
