<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="" class="label">이름</label>
        <input type="text" v-model="userName" />
      </div>
      <div>
        <label for="" class="label">아이디(닉네임)</label>
        <input class="id" type="text" v-model="userId" />
        <button class="idCheck" @click.prevent="idCheck">중복확인</button>
      </div>
      <div>
        <label for="" class="label">비밀번호</label>
        <input type="password" v-model="userPw" />
      </div>
      <div>
        <label for="" class="label">비밀번호 확인</label>
        <input type="password" v-model="checkPw" />
      </div>
      <div>
        <label for="" class="label">지역 선택</label>
        <div class="select">
          <select id="select1" v-model="si" @change="selectSiArea()">
            <option selected disabled>시</option>
            <option
              v-for="(item, index) in koreaRegion"
              :key="index"
              :value="index"
            >
              {{ index }}
            </option>
          </select>
          <select id="select2" v-model="gungu" @change="selectGuArea()">
            <option selected disabled>군구</option>
          </select>
          <select id="select3" v-model="dong">
            <option selected disabled>읍면동</option>
          </select>
        </div>
      </div>
      <button class="submit" type="submit">가입하기</button>
    </form>
  </div>
</template>

<script>
import koreaRegion from '@/assets/koreaRegion.json';
import { signUp } from '@/api/index.js';
export default {
  data() {
    return {
      userName: '',
      userId: '',
      userPw: '',
      checkPw: '',
      si: '',
      gungu: '',
      dong: '',
      koreaRegion,
    };
  },
  methods: {
    submitForm() {
      const newUser = {
        name: this.userName,
        userId: this.userId,
        pw: this.userPw,
        area: { si: this.si, gungu: this.gungu, dong: this.dong },
      };
      signUp(newUser);
      this.$router.push('./login');
    },
    // 수정 필요(코드 반복)
    selectSiArea() {
      const select1 = document.getElementById('select1');
      const select2 = document.getElementById('select2');

      const siArea = select1.options[select1.selectedIndex].value;
      const guArea = koreaRegion[siArea];

      select2.options.length = 0;

      for (let i in guArea) {
        let opt = document.createElement('option');
        opt.value = guArea[i];
        opt.text = guArea[i];

        select2.appendChild(opt);
      }
    },
    // 수정 필요(코드 반복)
    selectGuArea() {
      const select2 = document.getElementById('select2');
      const select3 = document.getElementById('select3');

      const guArea = select2.options[select2.selectedIndex].value;
      const dongArea = koreaRegion[guArea];
      console.log(dongArea);

      select3.options.length = 0;

      for (let i in dongArea) {
        let opt = document.createElement('option');
        opt.value = dongArea[i];
        opt.text = dongArea[i];

        select3.appendChild(opt);
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@400&display=swap');
div {
  margin: 0 auto;
  font-family: 'Gothic A1', sans-serif;
}
.label {
  display: block;
}
form {
  width: 88vw;
  margin: 5vh auto;
}
input {
  border: 1px solid rgb(233, 233, 222);
  border-radius: 10px;
  height: 5.8vh;
  margin-bottom: 3vh;
  margin-top: 1.4vh;
  width: 86vw;
  outline-color: rgb(245, 109, 145);
}
label {
  font-size: 1.4rem;
  color: rgb(63, 51, 81);
  font-family: 'Gothic A1', sans-serif;
}
.id {
  width: 61vw;
  margin-right: 1vw;
}
.idCheck {
  border-radius: 10px;
  border: 1px solid rgb(245, 109, 145);
  height: 5.8vh;
  width: 24vw;
  line-height: 5.8vh;
  background-color: white;
  color: rgb(245, 109, 145);
  font-family: 'Gothic A1', sans-serif;
  font-size: 1.4rem;
}
select {
  margin-top: 1.4vh;
  /* margin-right: 4vw; */
  border: 1px solid rgb(233, 233, 222);
  border-radius: 10px;
  width: 25vw;
  height: 5.8vh;
}
.select {
  display: flex;
  justify-content: space-between;
}
.submit {
  margin-top: 4vh;
  width: 86vw;
  height: 9vh;
  font-size: 2.4rem;
  border-radius: 10px;
  background-color: rgb(245, 109, 145);
  border: none;
  color: white;
  font-family: 'Gothic A1', sans-serif;
}
</style>
