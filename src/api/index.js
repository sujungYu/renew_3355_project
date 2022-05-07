import axios from 'axios';

const userURL = {
  baseUrl: 'http://localhost:8000',
};
// const subConfig = {
//   baseUrl: 'http://localhost:8001',
// };
function signUp(payload) {
  return axios.post(`${userURL.baseUrl}/user`, payload);
}
function login(payload) {
  axios.get(`${userURL.baseUrl}/user?userId=${payload}`)
  .then(res => {
      localStorage.setItem(
            'user',
            JSON.stringify({
              userId: res.data[0].userId,
              id: res.data[0].id,
            }),
          );
        localStorage.setItem('area', res.data[0].area.dong)
  })
  return;
}

export { signUp, login }