<template>
  <div class="footer">
    <div class="icon" @click="home">
      <i class="fa-solid fa-house"></i>
      홈
    </div>
    <div class="icon" @click="chat">
      <i class="fa-solid fa-comments"></i>
      채팅
    </div>
    <div class="icon" @click="attend">
      <i class="fa-solid fa-circle-check"></i>
      출석
    </div>
    <div class="icon">
      <i class="fa-solid fa-user"></i>
      내 정보
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    home() {
      this.$router.push(`/study`);
    },
    attend() {
      this.$router.push(`/attend`);
    },
    chat() {
      this.$router.push(`/chat/room`);
    },
  },
};
</script>

<style scoped>
.footer {
  margin: 0 auto;
  width: 100vw;
  height: 10vh;
  padding: 1vh 0;
  display: flex;
  justify-content: space-between;
  text-align: center;
  background-color: rgb(245, 109, 145);
  color: white;
  position: fixed;
  top: 88vh;
}
.icon {
  display: inline-block;
  font-size: 1.2rem;
}
i {
  font-size: 2.4rem;
  display: block;
}
</style>
