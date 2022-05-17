<template>
  <div>
    <div>
      <info-line>
        <h2 slot="name">내 프로필</h2>
        <!-- <i slot="icon" class="fa-solid fa-circle-question"></i> -->
      </info-line>
      <div class="info-container">
        <i class="fa-regular fa-circle-user smile"></i>
        <h2 class="user">{{ this.user }}</h2>
        <h2 class="area">{{ area.si }} {{ area.gungu }} {{ area.dong }}</h2>
      </div>
    </div>

    <info-line>
      <h2 slot="name">내 동네 설정</h2>
      <!-- <i slot="icon" class="fa-solid fa-circle-check" @click="setMyArea"></i> -->
    </info-line>
    <change-area></change-area>
    <!-- <modal v-show="showModal" :open="showModal" @close="showModal = false">
      <change-area></change-area>
    </modal> -->
    <!-- <info-line>
      <h2 slot="name">내 게시글</h2>
      <i slot="icon" class="fa-solid fa-circle-check"></i>
    </info-line> -->
  </div>
</template>

<script>
import ChangeArea from './ChangeArea.vue';
import InfoLine from './common/InfoLine.vue';
export default {
  components: { InfoLine, ChangeArea },
  data() {
    return {
      user: '',
      area: [],
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user')).userId;
    this.area = JSON.parse(localStorage.getItem('area'));
  },
  methods: {
    setMyArea() {
      this.showModal = !this.showModal;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap');
.smile {
  font-size: 5em;
  float: left;
  height: 10vh;
  width: 20vw;
}
.user {
  font-size: 2em;
  margin: 0 auto;
  /* text-align: center; */
}
.area {
  font-size: 1.3em;
  margin: 1.3vh auto;
  /* text-align: center; */
}
.info-container {
  color: rgb(141, 141, 170);
  padding-left: 9vw;
  font-family: 'Gothic A1', sans-serif;
  width: 86vw;
  /* margin-bottom: vh; */
}
</style>
