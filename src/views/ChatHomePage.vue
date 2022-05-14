<template>
  <div>
    <page-name>
      <h1 slot="title">채팅</h1>
    </page-name>
    <chat-home-form></chat-home-form>
  </div>
</template>

<script>
import ChatHomeForm from '../components/ChatHomeForm.vue';
import PageName from '../components/common/PageName.vue';
export default {
  components: {
    ChatHomeForm,
    PageName,
  },
};
</script>

<style></style>
