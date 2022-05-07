// import axios from 'axios';

const Login = {
    state: {
        user: '',
    },
    mutations: {
        nowUserId(state, payload) {
      state.user = payload;
    },
    },
    actions: {
        // async login({ commit }, payload) {
        // await axios.get(`${'http://localhost:8000'}/user?userId=${payload}`)
        // .then(res => {
        //   commit('nowUserId', res.data[0].);
        //   localStorage.setItem(
        //     'user', {userId: res.data[0].id,}
        //   );
        // });
    // },
    },
    getters: {}
}

export default Login;