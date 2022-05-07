import axios from 'axios';

const Study = {
    state: {},
    mutations: {},
    actions: {
        async stydyList({ commit }, payload) {
      await axios.get(`${'http://localhost:8001'}/${payload}`)
        .then(res => {
          commit('renewList', res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },},
    getters: []
}
export default Study