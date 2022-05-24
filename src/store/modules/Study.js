import axios from 'axios';

const Study = {
  state: {
    myStudyList: [],
    studyInfo: '',
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
    chatRooms: [],
    area: '',
    setDong: '',
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
    ChatRoomList(state, payload) {
      state.chatRooms = payload;
    },
    setArea(state, payload) {
      state.area = payload;
    },
    initArea(state) {
      state.area = '';
    },
    addDong(state, payload) {
      state.setDong = payload;
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
    async afterSelect({ commit }, payload) {
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
      await axios.get(`${'http://localhost:8005'}/member`).then(res => {
        const filterMyStudy = [];
        res.data.filter(e => {
          e.user.filter(d => {
            if (d.name == payload) {
              return filterMyStudy.push(e);
            }
          });
        });
        commit('myStudyList', filterMyStudy);
      });
    },
    async getDongList({ commit }, payload) {
      // eslint-disable-next-line prettier/prettier
      await axios.get(`${'http://localhost:8000'}/user?id=${payload}`).then(res=> {
          commit('dongList', res.data[0].dongList);
        });
    },
    async beforeSelect({ commit }, payload) {
      const lists = [];
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
      // eslint-disable-next-line prettier/prettier
      await axios.get(`${'http://localhost:8002'}/studyAttend?studyName=${payload}`)
        .then(res => {
          commit('addAttend', res.data);
        });
    },
    async teamAttend({ commit }, payload) {
      commit('initAttend');
      // eslint-disable-next-line prettier/prettier
      await axios.get(`${'http://localhost:8002'}/studyAttend?studyName=${payload.studyName}`)
        .then(res => {
          res.data.filter(e => {
            if (e.name == payload.studyUser) {
              if (e.attend == '출석') {
                commit('attend');
              } else if (e.attend == '지각') {
                commit('late');
              } else {
                commit('absence');
              }
            }
          });
        });
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
                commit('myAttend');
              } else if (e.attend == '지각') {
                commit('myLate');
              } else {
                commit('myAbsence');
              }
            }
          });
        });
    },
    async findChatRoom({ commit }, payload) {
      const chatRoom = [];
      // eslint-disable-next-line prettier/prettier
      await axios.get(`${'http://localhost:8003'}/chat`).then(res=> {
        res.data.filter(e => {
          if (e.guest == payload || e.host == payload) {
            return chatRoom.push(e);
          }
        });
        // chatRoom.push(res.data);
        commit('ChatRoomList', chatRoom);
      });
    },
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
