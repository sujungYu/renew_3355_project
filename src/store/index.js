import Vue from 'vue';
import Vuex from 'vuex';
import Login from './modules/Login';
import Study from './modules/Study';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    Login,
    Study
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});
