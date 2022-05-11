import axios from 'axios';

const Study = {
  state: {
    myStudyList: [],
    // myStudy: [],
    homeList: [],
    attendList: [],
    attendNum: 0,
    lateNum: 0,
    absenceNum: 0,
    myAttendNum: 0,
    myLateNum: 0,
    MyAbsenceNum: 0,
    year: '',
    month: '',
    day: '',
  },
  mutations: {
    addAttend(state, payload) {
      state.attendList = payload;
    },
    // nowStudy(state, payload) {
    //   state.studyInfo = payload;
    // },
    myStudyList(state, payload) {
      state.myStudyList = payload;
    },
    studyList(state, payload) {
      state.homeList = payload;
    },
    attend(state) {
      state.attendNum++;
      console.log(state.attendNum);
    },
    late(state) {
      state.lateNum++;
    },
    absence(state) {
      state.absenceNum++;
    },
    initAttend(state) {
      state.attendNum = 0;
      state.lateNum = 0;
      state.absenceNum = 0;
    },
    myAttend(state) {
      state.myAttendNum++;
      console.log(state.attendNum);
    },
    myLate(state) {
      state.myLateNum++;
    },
    myAbsence(state) {
      state.myAbsenceNum++;
    },
    initMyAttend(state) {
      state.myAttendNum = 0;
      state.myLateNum = 0;
      state.myAbsenceNum = 0;
    },
    clickDate(state, payload) {
      state.year = payload.year;
      state.month = payload.month;
      state.day = payload.day;
    },
  },
  actions: {
    // async stydyList({ commit }, payload) {
    //   // eslint-disable-next-line prettier/prettier
    //   await axios.get(`${'http://localhost:8001'}/${payload}`)
    //     .then(res => {
    //       commit('renewList', res.data);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    async afterSelect({ commit }, payload) {
      const area = JSON.parse(localStorage.getItem('area'));
      // eslint-disable-next-line prettier/prettier
      await axios.get(`${'http://localhost:8001'}/${payload}?dong=${area.dong}`)
        .then(res => {
          // console.log(res.data[0]);
          commit('studyList', res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    async setAttend({ commit }, payload) {
      await axios.get(`${'http://localhost:8001'}/users`).then(res => {
        const filterInfo = [];
        res.data.filter(e => {
          // console.log(e);
          e.user.filter(d => {
            if (d.name == payload) {
              return filterInfo.push(e);
            }
          });
        });
        // console.log(filterInfo);
        commit('myStudyList', filterInfo);
      });
    },
    async beforeSelect({ commit }) {
      const lists = [];
      const area = JSON.parse(localStorage.getItem('area'));
      // eslint-disable-next-line prettier/prettier
    await axios.get(`${'http://localhost:8001'}/language?dong=${area.dong}`).then(res => {
          res.data.filter(e => {
            lists.push(e);
          });
        });
      // eslint-disable-next-line prettier/prettier
    await axios.get(`${'http://localhost:8001'}/project?dong=${area.dong}`).then(res => {
          res.data.filter(e => {
            lists.push(e);
          });
        });
      // eslint-disable-next-line prettier/prettier
    await axios.get(`${'http://localhost:8001'}/certificate?dong=${area.dong}`).then(res => {
          res.data.filter(e => {
            lists.push(e);
          });
        });
      // eslint-disable-next-line prettier/prettier
    await axios.get(`${'http://localhost:8001'}/job?dong=${area.dong}`).then(res => {
          res.data.filter(e => {
            lists.push(e);
          });
        });
      commit('studyList', lists);
    },
    async getAttend({ commit }, payload) {
      //해당방ID를 payload로 받음
      // eslint-disable-next-line prettier/prettier
      await axios.get(`${'http://localhost:8002'}/studyAttend?studyName=${payload}`)
        .then(res => {
          console.log(res.data);
          commit('addAttend', res.data);
          // for (let i = 0; i < res.data.length; i++) {
          //   console.log(i);
          //   console.log(res.data);
          //   commit('addAttend', res.data[i]);
          // }
          console.log('1');
        });
    },
    async teamAttend({ commit }, payload) {
      commit('initAttend');
      // eslint-disable-next-line prettier/prettier
      await axios.get(`${'http://localhost:8002'}/studyAttend?studyName=${payload.studyName}`)
        .then(
          // eslint-disable-next-line prettier/prettier
      await axios.get(`${'http://localhost:8002'}/studyAttend?name=${payload.studyUser}`)
            .then(res => {
              res.data.filter(e => {
                console.log(e.data);
                if (e.attend == 'attend') {
                  console.log(e);
                  commit('attend');
                } else if (e.attend == 'late') {
                  console.log(e);
                  commit('late');
                } else {
                  console.log(e);
                  commit('absence');
                }
              });
            }),
        );
    },
    myAttend({ commit }, payload) {
      commit('initMyAttend');
      // eslint-disable-next-line prettier/prettier
      axios.get(`${'http://localhost:8002'}/studyAttend?studyName=${payload}`)
        .then(res => {
          res.data.filter(e => {
            const user = JSON.parse(localStorage.getItem('user')).userId;
            if (e.name == user) {
              if (e.attend == 'attend') {
                console.log(e);
                commit('myAttend');
              } else if (e.attend == 'late') {
                console.log(e);
                commit('myLate');
              } else {
                console.log(e);
                commit('myAbsence');
              }
            }
          });
        });
    },
    // getMyAttend({ commit }, payload) {
    //   // eslint-disable-next-line prettier/prettier
    //   axios.get(`${'http://localhost:8002'}/studyAttend?studyName=${payload.select}`)
    //   .then(res => {
    //       console.log(res.data);
    //     });
    // },
  },
  getters: {
    showAttend: state => {
      return state.attendList.filter(
        attend =>
          attend.createdAt == state.year + '-' + state.month + '-' + state.day,
      );
    },
  },
};
export default Study;
