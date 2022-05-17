import axios from 'axios';

const Study = {
  state: {
    myStudyList: [],
    studyInfo: '',
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
    myDongList: [],
  },
  mutations: {
    addAttend(state, payload) {
      state.attendList = payload;
    },
    nowStudy(state, payload) {
      state.studyInfo = payload;
    },
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
    async clickDate(state, payload) {
      state.year = await payload.year;
      state.month = await payload.month;
      state.day = await payload.day;
    },
    dongList(state, payload) {
      state.myDongList = payload;
    },
  },
  actions: {
    async setStudy({ commit }, payload) {
      // eslint-disable-next-line prettier/prettier
      await axios.get(`${'http://localhost:8001'}/${payload.type}?id=${payload.id}`)
        .then(res => {
          commit('nowStudy', res.data[0]);
        })
        .catch(err => {
          console.log(err);
        });
    },
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
      // const area = localStorage.getItem('dong');
      // eslint-disable-next-line prettier/prettier
      await axios.get(`${'http://localhost:8001'}/${payload.type}?dong=${payload.dong}`)
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
    async getDongList({ commit }, payload) {
      // eslint-disable-next-line prettier/prettier
      await axios.get(`${'http://localhost:8000'}/user?id=${payload}`).then(res=> {
          commit('dongList', res.data[0].dongList);
          console.log(res.data);
        });
    },
    async beforeSelect({ commit }, payload) {
      const lists = [];
      // const area = JSON.parse(localStorage.getItem('area'));
      // eslint-disable-next-line prettier/prettier
    await axios.get(`${'http://localhost:8001'}/language?dong=${payload}`).then(res => {
          res.data.filter(e => {
            lists.push(e);
          });
        });
      // eslint-disable-next-line prettier/prettier
    await axios.get(`${'http://localhost:8001'}/project?dong=${payload}`).then(res => {
          res.data.filter(e => {
            lists.push(e);
          });
        });
      // eslint-disable-next-line prettier/prettier
    await axios.get(`${'http://localhost:8001'}/certificate?dong=${payload}`).then(res => {
          res.data.filter(e => {
            lists.push(e);
          });
        });
      // eslint-disable-next-line prettier/prettier
    await axios.get(`${'http://localhost:8001'}/job?dong=${payload}`).then(res => {
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
                if (e.attend == '출석') {
                  console.log(e);
                  commit('attend');
                } else if (e.attend == '지각') {
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
              if (e.attend == '출석') {
                console.log(e);
                commit('myAttend');
              } else if (e.attend == '지각') {
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
