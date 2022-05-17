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
// const areaURL = {
//   baseUrl: 'http://localhost:8003',
// };
function signUp(payload) {
  return axios.post(`${userURL.baseUrl}/user`, payload);
}
async function login(payload) {
  await axios.get(`${userURL.baseUrl}/user?userId=${payload}`).then(res => {
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
function addArea(payload) {
  console.log(payload.dongList);
  console.log(payload.name);
  // eslint-disable-next-line prettier/prettier
  return axios.patch(`${userURL.baseUrl}/user/${payload.name}`, {"dongList":payload.dongList});
}

export { signUp, login, addStudy, studyAttend, addArea };
