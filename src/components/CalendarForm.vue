<template>
  <div>
    <div class="header">
      <i class="fas fa-angle-left arrowLeft" @click="controlMonth('prev')"></i>
      <h2>{{ year }}.{{ month }}</h2>
      <i
        class="fas fa-angle-right arrowRight"
        @click="controlMonth('next')"
      ></i>
    </div>

    <table>
      <thead>
        <th v-for="day in days" :key="day">{{ day }}</th>
      </thead>
      <tbody>
        <tr v-for="(date, idx) in dates" :key="idx">
          <td
            v-for="(day, index) in date"
            :key="index"
            :class="{
              'selected-date':
                isToday(year, month, day) && !isPrevDates(day, idx),
              'prev-dates': isPrevDates(day, idx),
            }"
            @click="clickDate(day, isPrevDates(day, idx))"
            class="pointer"
          >
            {{ day }}

            <div
              v-if="getMatchedAttend(day).length > 0 && !isPrevDates(day, idx)"
            >
              <!-- {sfwef} -->
              <i class="fa-solid fa-user user"></i>
              <!-- <div
                v-for="(attend, idx) in getMatchedAttend(day)"
                :key="idx"
                class="check"
              >
                {{ attend.name }}{{ attend.attend }}
              </div> -->
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <modal v-show="showModal" :open="showModal" @close="close">
      <attend-member></attend-member>
    </modal>
  </div>
</template>

<script>
import AttendMember from './AttendMember.vue';
import Modal from './common/Modal.vue';
export default {
  components: {
    Modal,
    AttendMember,
  },
  data() {
    return {
      days: ['일', '월', '화', '수', '목', '금', '토'],
      dates: [],
      year: 0,
      month: 0,
      day: new Date().getDate(),
      currentYear: 0,
      currentMonth: 0,
      currentDate: new Date().getDate(),
      clickDay: 0,
      prevDate: [],
      previewDate: [],
      showModal: false,
      id: null,
    };
  },
  computed: {
    monthToString() {
      return this.months[this.month - 1];
    },
    isCurrentDate() {
      let status = false;
      if (this.currentYear === 0 && this.currentMonth === 0) {
        status = true;
      } else {
        status =
          this.currentYear === new Date().getFullYear() &&
          this.currentMonth === new Date().getMonth() + 1;
      }
      return status;
    },
  },
  created() {
    this.init();
    // this.$store.commit('initAttend');
    // let status = false;
    // if (this.currentYear === 0 && this.currentMonth === 0) {
    //   status = true;
    // } else {
    //   status =
    //     this.currentYear === new Date().getFullYear() &&
    //     this.currentMonth === new Date().getMonth() + 1;
    // }
    // return status;
  },
  methods: {
    init(param) {
      if (param) {
        this.year = param[0];
        this.month = param[1];
        this.calendarDate();
      } else {
        const date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.calendarDate();
      }
    },
    calendarDate() {
      const [
        monthFirstDay,
        monthLastDate,
        prevMonthLastDate,
      ] = this.getFirstDayLastDate(this.year, this.month);
      this.dates = this.getDaysOfMonth(
        monthFirstDay,
        monthLastDate,
        prevMonthLastDate,
      );
    },
    getFirstDayLastDate(year, month) {
      const firstDay = new Date(year, month - 1, 1).getDay();
      const lastDate = new Date(year, month, 0).getDate();
      let lastMonth = month - 1;
      if (month === 1) {
        lastMonth = 12;
        year -= 1;
      }
      const prevLastDate = new Date(year, lastMonth, 0).getDate();
      return [firstDay, lastDate, prevLastDate];
    },
    getDaysOfMonth(monthFirstDay, monthLastDate, prevMonthLastDate) {
      let day = 1;
      let prevDay = prevMonthLastDate - monthFirstDay + 1;
      let dates = [];
      let daysOfWeek = [];
      while (day <= monthLastDate) {
        if (day === 1) {
          this.getPrevDates(monthFirstDay, daysOfWeek, prevDay);
          this.padDates(daysOfWeek);
        }
        if (daysOfWeek.length === 7) {
          dates.push(daysOfWeek);
          day = daysOfWeek[daysOfWeek.length - 1];
          daysOfWeek = [];
        } else if (
          daysOfWeek.length < 7 &&
          daysOfWeek.indexOf(monthLastDate) > -1
        ) {
          this.padDates(daysOfWeek);
          dates.push(daysOfWeek);
          break;
        }
        day++;
        if (daysOfWeek.length <= 7) {
          daysOfWeek.push(day);
        }
      }
      return dates;
    },
    getPrevDates(monthFirstDay, daysOfWeek, prevDay) {
      for (let j = 0; j < monthFirstDay; j++) {
        daysOfWeek.push(prevDay);
        this.prevDate.push(prevDay);
        prevDay += 1;
      }
    },
    padDates(daysOfWeek) {
      const len = daysOfWeek.length;
      // console.log(len);
      const leftDays = 7 - len;
      console.log(leftDays);
      if (len >= 0 && len < 7) {
        for (let i = 1; i <= leftDays; i++) {
          daysOfWeek.push(i);
          if (this.previewDate.length < leftDays) this.previewDate.push(i);
        }
      }
    },
    controlMonth(p) {
      this.prevDate = [];
      if (p === 'prev') {
        this.currentMonth = this.month - 1;
        this.currentYear = this.year;
        if (this.month === 1) {
          this.currentMonth = 12;
          this.currentYear = this.year -= 1;
        }
      } else {
        this.currentMonth = this.month + 1;
        this.currentYear = this.year;
        if (this.month === 12) {
          this.currentMonth = 1;
          this.currentYear = this.year += 1;
        }
      }
      const param = [this.currentYear, this.currentMonth];
      this.init(param);
    },
    getMatchedAttend(day) {
      return this.$store.state.Study.attendList.filter(attend => {
        const attendDate = new Date(attend.createdAt);
        const isDateMatched = attendDate.getDate() === day;
        const isMonthMatched = attendDate.getMonth() === this.month - 1;
        const isYearMathced = attendDate.getFullYear() === this.year;
        return isDateMatched && isMonthMatched && isYearMathced;
      });
    },
    isPrevDates(day, idx) {
      // console.log(this.previewDate);
      return (
        (this.prevDate.indexOf(day) > -1 && idx < 1) ||
        (this.previewDate.indexOf(day) > -1 && idx > 1)
      );
    },
    async clickDate(day, idx) {
      console.log('2');
      // console.log(this.previewDate);
      // console.log(idx);
      const attendYear = this.year;
      let attendMonth = this.month;
      const attendDay = day;
      // console.log(attendDay);
      // eslint-disable-next-line prettier/prettier
      if(idx) {
        if (this.prevDate.includes(day)) {
          // console.log('이전');
          attendMonth = attendMonth - 1;
        } else {
          // console.log('이후');
          attendMonth = attendMonth + 1;
        }
      } else {
        attendMonth = this.month;
        // console.log('지금');
      }
      // console.log(attendMonth);
      // this.prevDate.filter(e => {
      //   console.log(e);
      //   if (e == day) {
      //     console.log('이전');
      //     return (this.attendMonth = attendMonth - 1);
      //   } else {
      //     console.log('이후');
      //     return (this.attendMonth = attendMonth + 1);
      //   }
      // });

      // if(idx ==true) {
      //   for (let i = 0; i < this.prevDate.length; i++) {
      //     console.log(this.prevDate[0]);
      //     if (this.prevDate[i] == day) {
      //       console.log('이전');
      //       console.log(day);
      //       this.attendMonth = attendMonth - 1;
      //       break;
      //     } else {
      //       this.attendMonth = attendMonth + 1;
      //       console.log('이후');
      //       break;
      //     }
      //   }
      // } else {
      //   this.attendDay = day;
      // }
      // this.prevDate.forEach(e => {
      //   if (idx == true && e == day) {
      //     console.log('이전');
      //     this.attendMonth = attendMonth - 1;
      //     return false;
      //   } else if (idx == true && e != day) {
      //     this.attendMonth = attendMonth + 1;
      //     console.log('이후');
      //     return false;
      //   } else {
      //     this.attendMonth = this.month;
      //     console.log('지금');
      //     return false;
      //   }
      // });

      // if(idx == true && this.forEach.)
      // if (idx == true && this.prevDate.forEach(prevDate => {
      //     if (prevDate == day) {
      //       console.log(prevDate);
      //       console.log('이전');
      //       this.attendMonth = attendMonth - 1;
      //       return;
      //     } else {
      //       this.attendMonth = attendMonth + 1;
      //       console.log('이후');
      //       return;
      //     }
      //   })
      // )
      //   return;
      // else {
      //   this.attendMonth = this.month;
      //   console.log('지금');
      //   console.log(this.attendMonth);
      // }

      // console.log(this.prevDate);

      this.showModal = !this.showModal;
      await this.$store.commit('clickDate', {
        year: attendYear,
        month: attendMonth,
        day: attendDay,
      });
    },
    isToday(year, month, day) {
      let date = new Date();
      if (
        year == date.getFullYear() &&
        month == date.getMonth() + 1 &&
        day == date.getDate()
      ) {
        return true;
      } else {
        return false;
      }
    },
    close() {
      this.showModal = false;
      this.$router.go();
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kite+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
div {
  margin: 0 auto;
}
h2 {
  margin: 0;
  text-align: center;
  font-family: 'Ubuntu', sans-serif;
  font-size: 3rem;
  color: rgb(82, 74, 78);
}
.header {
  display: flex;
  justify-content: space-between;
  width: 70vw;
  margin-bottom: 7vh;
  margin-top: 5vh;
  /* height: 1vh; */
  /* height: 1vh; */
  /* position: relative; */
  /* justify-content: center;
  text-align: center; */
  /* padding: 0 auto; */
}
.arrowLeft {
  font-size: 3rem;
  color: rgb(82, 74, 78);
  /* position: absolute;
  justify-content: center;
  left: 10vw;
  top: -0.4vh;
  font-size: 2.5rem;
  color: rgb(28, 31, 34); */
}
.arrowRight {
  font-size: 3rem;
  color: rgb(82, 74, 78);
  /* position: absolute;
  justify-content: center;
  right: 10vw;
  bottom: -0.5vh;
  font-size: 2.5rem;
  color: rgb(28, 31, 34); */
}
.back {
  left: 6vw;
  top: 2.5vh;
  position: absolute;
}
table {
  margin: 0 auto;
  text-align: center;
  border-collapse: collapse;
  width: 90vw;
  /* height: 70vh; */
  font-family: 'Gothic A1', sans-serif;
  font-size: 1.25em;
  table-layout: fixed;
  /* word-break: break-all; */
}
/* i {
  margin: 0;
} */
th {
  border-bottom: 0.5px solid rgba(141, 141, 170, 0.5);
}

td {
  height: 10vh;
  border-bottom: 0.5px solid rgb(233, 233, 222);
  vertical-align: top;
}
th:nth-child(1) {
  color: rgb(255, 36, 66);
}
th:nth-child(7) {
  color: rgb(61, 178, 255);
}
.pointer {
  cursor: pointer;
}
/* .rounded {
  -moz-border-radius: 20px 20px 20px 20px;
  border-radius: 20px 20px 20px 20px;
  border: solid 1px #ffffff;
  background-color: #2b6bd1;
  padding: 10px;
  color: #ffffff;
} */
.prev-dates {
  color: lightgray;
  /* background: none; */
}
.selected-date {
  background-color: rgb(245, 109, 145);
}
.user {
  /* height: 5vh; */
  line-height: 5vh;
  text-align: center;
  color: rgb(245, 109, 145);
  font-size: 1.5em;
}
/* .check {
  color: red;
} */
</style>
