<template>
  <div>
    <h1 class="title">{{ studyName }}</h1>
    <hr
      style="width:80vw; height:2px; border:none; background-color:rgb(245, 109, 145);"
    />
    <p class="today">
      {{ this.$store.state.Study.year }}.{{ this.$store.state.Study.month }}.{{
        this.$store.state.Study.day
      }}
    </p>
    <template
      v-if="
        this.year == this.$store.state.Study.year &&
          this.month == this.$store.state.Study.month &&
          this.day == this.$store.state.Study.day
      "
    >
      <div>
        <h2 v-for="user in users" :key="user" id="user" class="user">
          {{ user }}
          <div class="button-container">
            <button id="attend" @click="check('attend', user)">출석</button>
            <button id="late" @click="check('late', user)">지각</button>
            <button id="absence" @click="check('absence', user)">결석</button>
          </div>
        </h2>
      </div>
    </template>

    <template v-else>
      <ul>
        <li v-for="(attend, index) in attend" :key="index">
          <i class="far fa-calendar-check check"></i>
          {{ attend.name }}{{ attend.attend }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { studyAttend } from '@/api/index.js';
export default {
  data() {
    return {
      studyName: '',
      users: [],
      year: '',
      month: '',
      day: '',
    };
  },
  async created() {
    this.studyName = localStorage.getItem('study');
    const getUsers = JSON.parse(localStorage.getItem('studyUser'));
    getUsers.filter(e => {
      this.users.push(e.name);
    });
    // console.log(this.users);
    // const id = this.$store.state.Bulletin.attendId;
    await this.$store.dispatch('getAttend', this.studyName);
    const today = new Date();
    this.year = today.getFullYear();
    this.month = ('0' + (today.getMonth() + 1)).slice(-2);
    this.day = ('0' + today.getDate()).slice(-2);
    // this.init();
  },
  computed: {
    attend() {
      console.log(this.$store.getters.showAttend);
      return this.$store.getters.showAttend;
    },
  },
  methods: {
    // init() {
    //   this.$store.commit('initAttend');
    // },
    check(check, user) {
      const attendInfo = {
        name: user,
        attend: check,
        createdAt:
          this.$store.state.Calendar.year +
          '-' +
          this.$store.state.Calendar.month +
          '-' +
          this.$store.state.Calendar.day,
        studyName: this.studyName,
      };
      studyAttend(attendInfo);
      // console.log(check);
      // console.log(user);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sunflower:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap');
.title {
  text-align: center;
  font-family: 'Sunflower', sans-serif;
  color: rgb(245, 109, 145);
}
.today {
  font-family: 'Gothic A1', sans-serif;
  text-align: center;
  font-size: 1.3rem;
  font-weight: bold;
}
.user {
  font-family: 'Gothic A1', sans-serif;
  margin: 2vh auto;
  width: 88vw;
  text-align: center;
}
button {
  width: 17vw;
  border: 1px solid rgb(245, 109, 145);
  background-color: white;
  border-radius: 10px;
  /* justify-content: space-between; */
}
.button-container {
  display: inline-block;
  /* display: flex; */
  width: 61vw;
  /* justify-content: space-between; */
}
</style>
