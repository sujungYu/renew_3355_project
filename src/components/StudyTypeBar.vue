<template>
  <div>
    <div class="selectDont-container">
      <select v-model="dong" @change="selectDong" class="selectDong">
        <option value="" disabled hidden>스터디 지역을 선택하세요.</option>
        <option v-for="item in this.dongList" :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <nav>
      <ul class="type-container">
        <li id="language" name="type">언어</li>
        <li id="project" name="type">프로젝트</li>
        <li id="certificate" name="type">자격증</li>
        <li id="job" name="type">취업</li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dong: '',
      dongList: [],
    };
  },
  async created() {
    await this.setStudyHome();
    this.dongList = this.$store.state.Study.myDongList;
  },
  mounted() {
    const type = document.querySelector('.type-container');
    type.addEventListener('click', e => {
      const selected = e.target;
      this.changeType(selected.id);
      this.select(type, selected);
    });
  },
  methods: {
    async setStudyHome() {
      const user = JSON.parse(localStorage.getItem('user')).id;
      const area = JSON.parse(localStorage.getItem('area')).dong;
      await this.$store.dispatch('beforeSelect', area);
      await this.$store.dispatch('getDongList', user);
    },
    selectDong() {
      this.$store.dispatch('beforeSelect', this.dong);
    },
    select(ulEl, liEl) {
      Array.from(ulEl.children).forEach(v => {
        v.classList.remove('selected');
      });
      if (liEl) {
        liEl.classList.add('selected');
      }
    },
    async changeType(type) {
      if (this.dong == '') {
        return (this.dong = JSON.parse(localStorage.getItem('area')).dong);
      }
      await this.$store.dispatch('afterSelect', {
        type: type,
        dong: this.dong,
      });
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300&display=swap');
.selectDont-container {
  margin: 0 auto;
  margin-bottom: 2vh;
  width: 86vw;
}
.selectDong {
  height: 4vh;
  width: 86vw;
  border: 2px solid rgb(245, 109, 145);
  border-radius: 5px;
}
.type-container {
  margin: 0 auto;
  height: 4vh;
  width: 86vw;
}
ul {
  padding: 0;
  text-align: center;
  display: flex;
  justify-content: space-between;
}
li {
  display: inline-block;
}

ul li {
  list-style: none;
  color: rgb(63, 51, 81);
  font-size: 1.6rem;
  font-family: 'Gothic A1', sans-serif;
  font-weight: bold;
}
.type-container li:hover {
  color: rgb(245, 109, 145);
}
.type-container li.selected {
  color: rgb(245, 109, 145);
}
</style>
