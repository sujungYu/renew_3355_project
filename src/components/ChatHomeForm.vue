<template>
  <div>
    <ul>
      <li v-for="item in chatrooms" :key="item" @click="enterRoom(item.roomId)">
        <i class="fa-solid fa-face-smile smile"></i>
        <i
          class="fa-solid fa-circle-minus delete"
          @click="deleteRoom(item.roomId)"
        ></i>
        <div class="chat-name">
          <h3>{{ item.roomName }}</h3>
          <h2>{{ item.guest }}</h2>
        </div>
      </li>
    </ul>
    <!-- <ul>
      <li v-for="item in chatrooms" :key="item" @click="enterRoom(item.roomId)">
        <i class="fa-solid fa-face-smile"></i>{{ item.roomName }}
        <i
          class="fa-solid fa-circle-minus"
          @click="deleteRoom(item.roomId)"
        ></i>
      </li>
    </ul> -->
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      //   title: '',
      //   guest: '',
      chatrooms: [],
    };
  },
  created() {
    // this.title = '토토토토익';
    // this.guest = '쑤우';
    this.findAllRoom();
  },
  methods: {
    findAllRoom() {
      axios.get('/chat/rooms').then(response => {
        this.chatrooms = response.data;
      });
    },
    enterRoom(roomId) {
      const sender = JSON.parse(localStorage.getItem('user')).userId;
      if (sender != '') {
        localStorage.setItem('wschat.sender', sender);
        localStorage.setItem('wschat.roomId', roomId);
        location.href = '/chat/room/enter/' + roomId;
      }
    },
    deleteRoom(roomId) {
      console.log('delete');
      axios.delete('/chat/roominfo?roomId=' + roomId);
      axios.delete('/chat/messages?roomId=' + roomId);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap');
div {
  margin: 0 auto;
}
ul {
  padding: 0;
  margin: 0 auto;
  list-style-type: none;
}
li {
  margin: 0 auto;
  border: 1px solid rgb(223, 223, 222);
  width: 86vw;
  height: 12vh;
  border-top: 0;
  border-left: 0;
  border-right: 0;
}
.smile {
  line-height: 10vh;
  font-size: 4.1em;
  float: left;
  color: rgb(141, 141, 170);
}
.delete {
  position: relative;
  top: 3vh;
  line-height: 12vh;
  font-size: 2em;
  float: right;
  color: rgb(141, 141, 170);
}
.chat-name {
  width: 86vw;
  /* line-height: 14vh; */
  font-family: 'Gothic A1', sans-serif;
  text-align: center;
}
h2 {
  margin: 0 auto;

  /* margin: 0; */
  /* padding-top: 1vh; */
  font-size: 2.3em;
}
h3 {
  /* margin: 0; */
  margin-bottom: 1vh;
  color: rgb(141, 141, 170);
  height: 3vh;
  font-size: 1.4em;
}
</style>
