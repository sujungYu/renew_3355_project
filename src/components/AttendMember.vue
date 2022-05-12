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
          <!-- <div class="select" @change="attendCheck">
            <input type="radio" id="select1" name="user" value="출석" />
            <label for="select1">출석</label>
            <input type="radio" id="select2" name="attend" value="지각" />
            <label for="select2">지각</label>
            <input type="radio" id="select3" name="attend" value="결석" />
            <label for="select3">결석</label>
          </div> -->
          <div class="button-container">
            <button id="attend" @click.once="check('출석', user)">출석</button>
            <button id="late" @click.once="check('지각', user)">지각</button>
            <button id="absence" @click.once="check('결석', user)">결석</button>
          </div>
        </h2>
      </div>
    </template>

    <template v-else>
      <ul class="member-attend">
        <li v-for="(attend, index) in attend" :key="index">
          <i class="fa-regular fa-square-check"></i>&nbsp;&nbsp;
          {{ attend.name }} -
          {{ attend.attend }}
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
    attendCheck() {
      const attend = document.getElementsByName('attend').length;

      for (var i = 0; i < attend; i++) {
        if (document.getElementsByName('attend')[i].checked == true) {
          this.attend = document.getElementsByName('attend')[i].value;
          // console.log(document.getElementsByName('attend')[i].value);
        }
      }
    },
    // init() {
    //   this.$store.commit('initAttend');
    // },
    check(check, user) {
      const attendInfo = {
        name: user,
        attend: check,
        createdAt:
          this.$store.state.Study.year +
          '-' +
          this.$store.state.Study.month +
          '-' +
          this.$store.state.Study.day,
        studyName: this.studyName,
      };
      studyAttend(attendInfo);
      const target = document.getElementById('attend');
      const tr = document.getElementById('late');
      console.log(target);
      target.disabled = true;
      tr.disabled = true;
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
button:focus {
  background-color: pink;
}
.button-container {
  /* font-family: 'Sunflower', sans-serif; */
  display: inline-block;
  /* display: flex; */
  width: 61vw;

  /* justify-content: space-between; */
}
.member-attend {
  font-family: 'Sunflower', sans-serif;
  list-style: none;
  font-size: 2em;
}
i {
  color: rgb(245, 109, 145);
}
li {
  margin: 3vh auto;
}
</style>
