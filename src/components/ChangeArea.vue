<template>
  <div class="container">
    <h3><i class="fa-solid fa-location-crosshairs"></i>&nbsp;동네 재설정</h3>
    <hr
      style="width:80vw; height:1px; border:none; background-color:rgb(245, 109, 145);"
    />
    <div class="select">
      <select
        id="select1"
        v-model="si"
        @change="selectArea('select1', 'select2')"
      >
        <option value="" disabled hidden>시</option>
        <option
          v-for="(item, index) in koreaRegion"
          :key="index"
          :value="index"
        >
          {{ index }}
        </option>
      </select>
      <select
        id="select2"
        v-model="gungu"
        @change="selectArea('select2', 'select3')"
      >
        <option value="" disabled hidden>군구</option>
      </select>
      <select id="select3" v-model="dong">
        <option value="" disabled hidden>읍면동</option>
      </select>
    </div>
    <h3><i class="fa-solid fa-location-crosshairs"></i>&nbsp;동네 추가</h3>
    <hr
      style="width:80vw; height:1px; border:none; background-color:rgb(245, 109, 145);"
    />
    <div class="dong-container">
      <div class="dong" v-for="(index, item) in dongs" :key="item">
        <input type="checkbox" v-model="addDong" :value="index" :id="item" />
        <label :for="item"> {{ index }}</label>
      </div>
      <i class="fa-solid fa-circle-plus submit" @click="submit"></i>
      <!-- <button class="submit" @click="submit">완료</button> -->
    </div>
  </div>
</template>

<script>
import koreaRegion from '@/assets/koreaRegion.json';
import { addArea } from '@/api/index.js';
export default {
  data() {
    return {
      si: '',
      gungu: '',
      dong: '',
      koreaRegion,
      getDong: [],
      addDong: [],
    };
  },
  computed: {
    dongs() {
      if (this.gungu == '') {
        return this.getDong;
      } else {
        return koreaRegion[this.gungu];
      }
    },
  },
  created() {
    const gungu = JSON.parse(localStorage.getItem('area')).gungu;
    this.getDong = koreaRegion[gungu];
  },
  methods: {
    selectArea(area1, area2) {
      console.log(area1);
      const select1 = document.getElementById(area1);
      const select2 = document.getElementById(area2);
      const mainArea = select1.options[select1.selectedIndex].value;
      const subArea = koreaRegion[mainArea];

      select2.options.length = 0;

      for (let i in subArea) {
        let opt = document.createElement('option');
        opt.value = subArea[i];
        opt.text = subArea[i];

        select2.appendChild(opt);
      }
    },
    submit() {
      const areaInfo = {
        name: JSON.parse(localStorage.getItem('user')).id,
        dongList: this.addDong,
      };
      addArea(areaInfo);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sunflower:wght@300&display=swap');
.container {
  margin-top: 2vh;
}
h2 {
  font-family: 'Sunflower', sans-serif;
  font-size: 2em;
  color: rgb(245, 109, 145);
  text-align: center;
}
h3 {
  width: 80vw;
  margin: 0 auto;
  font-family: 'Sunflower', sans-serif;
  font-size: 1.3em;
  color: rgb(245, 109, 145);
}
select {
  margin-top: 1.4vh;
  /* margin-right: 4vw; */
  border: 1px solid rgb(245, 109, 145);
  border-radius: 10px;
  width: 25vw;
  height: 3.5vh;
}
.select {
  margin: 0 auto;
  margin-bottom: 2vh;
  text-align: center;
  width: 80vw;
  display: flex;
  justify-content: space-between;
}
.dong-container {
  width: 80vw;
  margin: 0 auto;
}
.dong {
  display: inline-block;
  margin: 0 auto;
}
/* 실제 체크박스를 화면에서 숨김*/
.dong input[type='checkbox'] {
  display: none;
}
/* 가짜 체크박스 */
.dong input[type='checkbox'] + label {
  margin: 0.5vh 1vw;
  display: inline-block;
  cursor: pointer;
  height: 4vh;
  width: 17vw;
  border: 1px solid rgb(245, 109, 145);
  border-radius: 10px;
  line-height: 4vh; /* 세로 정렬을 위해 높이값과 일치*/
  text-align: center;
  font-weight: bold;
  font-size: 1.3rem;
}
.dong input[type='checkbox'] + label {
  background-color: white;
  color: rgb(245, 109, 145);
}
/* 체크박스를 체크 했을 때 */
.dong input[type='checkbox']:checked + label {
  background-color: rgb(245, 109, 145);
  color: white;
}
.submit {
  display: block;
  margin-top: 4vh;
  /* width: 86vw; */
  /* height: 6vh; */
  font-size: 3em;
  float: right;
  /* border-radius: 10px; */
  /* background-color: rgb(245, 109, 145); */
  /* border: none; */
  color: rgb(245, 109, 145);
  /* font-family: 'Gothic A1', sans-serif; */
}
</style>
