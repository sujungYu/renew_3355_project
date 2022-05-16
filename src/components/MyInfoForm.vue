<template>
  <div>
    <!-- <div>
      <info-line>
        <h2 slot="name">내 프로필</h2>
        <i slot="icon" class="fa-solid fa-circle-question"></i>
      </info-line>
      <i class="fa-solid fa-face-smile"></i>
      <h2>{{ this.user }}</h2>
      <h2>{{ area.si }} {{ area.gungu }} {{ area.dong }}</h2>
    </div> -->

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

<style></style>
