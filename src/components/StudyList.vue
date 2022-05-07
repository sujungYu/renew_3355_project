<template>
  <div>
      <study-type-bar></study-type-bar>
    <hr
      style="width:86vw; height:1px; border:none; background-color:rgb(223, 223, 222);"
    />
    <ul v-for="list in lists" :key="list.title">
      <li>
        <router-link :to="`./${list.type}/${list.id}`">
          <div class="list">{{ list.title }}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import StudyTypeBar from './StudyTypeBar.vue'
export default {
  components: { StudyTypeBar },
  data() {
      return {
          lists: []
      }
  },
  created() {
      const area = localStorage.getItem('area')
      axios.get(`${'http://localhost:8001'}/?dong=${area}`)
      .then(res => {
          console.log(res.data);
      })
  }
}
</script>

<style>

</style>