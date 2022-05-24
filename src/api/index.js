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
const chatMessagesURL = {
  baseUrl: 'http://localhost:8004',
};
const chatRoomsURL = {
  baseUrl: 'http://localhost:8003',
};
const studyMembersURL = {
  baseUrl: 'http://localhost:8005',
};
function signUp(payload) {
  return axios.post(`${userURL.baseUrl}/user`, payload);
}
async function login(payload) {
  await axios.get(`${userURL.baseUrl}/user?userId=${payload}`).then(res => {
    // eslint-disable-next-line prettier/prettier
    localStorage.setItem('user',JSON.stringify({userId: res.data[0].userId,id: res.data[0].id,}));
    localStorage.setItem('area', JSON.stringify(res.data[0].area));
    return;
  });
}
function addStudy(payload) {
  return axios.post(`${studyURL.baseUrl}/${payload.type}`, payload);
}
function studyAttend(payload) {
  return axios.post(`${attendURL.baseUrl}/studyAttend`, payload);
}
async function addArea(payload) {
  // eslint-disable-next-line prettier/prettier
  return await axios.patch(`${userURL.baseUrl}/user/${payload.name}`, {"dongList":payload.dongList});
}
function deleteChatRoom(payload) {
  return axios.delete(`${chatRoomsURL.baseUrl}/chat?roomId=${payload}`);
}
function deleteChaMessages(payload) {
  return axios.delete(`${chatMessagesURL.baseUrl}/messages?roomId=${payload}`);
}
function addMembersForm(payload) {
  return axios.post(`${studyMembersURL.baseUrl}/member`, payload);
}
function addMembers(payload) {
  console.log(payload);
  const memberInfo = {
    name: payload.member,
    manager: false,
  };
  // eslint-disable-next-line prettier/prettier
  axios.get(`${studyMembersURL.baseUrl}/member?title=${payload.title}`).then(res=> {
      const userList = res.data[0].user;
      // eslint-disable-next-line prettier/prettier
      return axios.patch(`${studyMembersURL.baseUrl}/member/${res.data[0].id}`, { "user": userList.concat(memberInfo) });
    });
}
function renewArea(payload) {
  localStorage.setItem('area', JSON.stringify(payload.area));
  axios.patch(`${userURL.baseUrl}/user/${payload.userId}`, {
    area: payload.area,
  });
}
export {
  signUp,
  login,
  addStudy,
  studyAttend,
  addArea,
  deleteChatRoom,
  deleteChaMessages,
  addMembersForm,
  addMembers,
  renewArea,
};
