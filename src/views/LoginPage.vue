<template>
<div class="login">
    <div class="title">
        <page-name>삼삼오오</page-name>
    </div>
        <login-form></login-form>
</div>

</template>

<script>
import PageName from '@/components/common/PageName.vue'
import LoginForm from '@/components/LoginForm.vue'
export default {
  components: { PageName,LoginForm },

}
</script>

<style>
h1 {
    font-size: 4rem;
}
i {
    font-size: 2.4rem;
}
.title {
    padding-top: 20vh;
     /* font-size: 4rem; */
}

</style>