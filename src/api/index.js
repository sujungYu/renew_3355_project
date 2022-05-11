import axios from 'axios';

const userURL = {
  baseUrl: 'http://localhost:8000',
};
const studyURL = {
  baseUrl: 'http://localhost:8001',
};
const attendURL = {
  baseUrl: 'http://localhost:8002',
};
function signUp(payload) {
  return axios.post(`${userURL.baseUrl}/user`, payload);
}
function login(payload) {
  axios.get(`${userURL.baseUrl}/user?userId=${payload}`).then(res => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        userId: res.data[0].userId,
        id: res.data[0].id,
      }),
    );
    localStorage.setItem('area', JSON.stringify(res.data[0].area));
  });
  return;
}
function addStudy(payload) {
  return axios.post(`${studyURL.baseUrl}/${payload.type}`, payload);
}
function studyAttend(payload) {
  return axios.post(`${attendURL.baseUrl}/studyAttend`, payload);
}

export { signUp, login, addStudy, studyAttend };
