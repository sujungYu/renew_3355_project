<template>
  <div class="select">
    <select
      id="select1"
      v-model="si"
      @change="selectArea('select1', 'select2')"
    >
      <option value="" disabled hidden>시</option>
      <option v-for="(item, index) in koreaRegion" :key="index" :value="index">
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
    <select id="select3" v-model="dong" @change="setArea">
      <option value="" disabled hidden>읍면동</option>
    </select>
  </div>
</template>

<script>
import koreaRegion from '@/assets/koreaRegion.json';
export default {
  data() {
    return {
      url: '',
      si: '',
      gungu: '',
      dong: '',
      addDong: [],
      koreaRegion,
    };
  },
  created() {
    this.url = this.$route.path;
  },
  methods: {
    selectArea(area1, area2) {
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
    setArea() {
      const area = {
        si: this.si,
        gungu: this.gungu,
        dong: this.dong,
      };
      this.$store.commit('setArea', area);
      if (this.url == '/myInfo') {
        this.addDong = [];
        this.addDong.push(this.dong);
        this.$store.commit('addDong', this.addDong);
      }
    },
  },
};
</script>

<style scoped></style>
