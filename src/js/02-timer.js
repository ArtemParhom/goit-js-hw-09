// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTimeInputEl = document.querySelector(`#datetime-picker`);
const btnStartEl = document.querySelector('button[data-start]');
const spanDataDays = document.querySelector('span[data-days]');
const spanDataHours = document.querySelector('span[data-hours]');
const spanDataMinutes = document.querySelector('span[data-minutes]');
const spanDataSeconds = document.querySelector('span[data-seconds]');

btnStartEl.disabled = true;
let startTime;

const options = {
  altInput: true,
  enableTime: true,
  time_24hr: true,
//   defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    btnStartSwich(selectedDates[0]);
    startTime = selectedDates[0];
  },
};

dateTimeInputEl.addEventListener('click', () => {
  flatpickr(dateTimeInputEl, options);
});

btnStartEl.addEventListener(`click`, () => {
  timer.start();
  btnStartEl.disabled = true;
  console.log(`start`);
});

function btnStartSwich(params) {
  const dateNow = Date.now();
  if (params > dateNow) {
    btnStartEl.disabled = false;
    return;
  }
  Notify.failure("Please choose a date in the future");
};

const timer = {
  intervald: null,
  start() {
    this.intervald = setInterval(() => {
      const overTime = startTime - Date.now();
      console.log(overTime);
      const { days, hours, minutes, seconds } = convertMs(overTime);
      console.log(convertMs(overTime));
      spanDataDays.textContent = `${days}`;
      spanDataHours.textContent = `${hours}`;
      spanDataMinutes.textContent = `${minutes}`;
      spanDataSeconds.textContent = `${seconds}`;
    if (overTime <= 1000) {
        timer.stop();
        console.log(100000000000000);
      };
    }, 1000);
  } ,
  stop() {
    clearInterval(this.intervald);
  }
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return String(value).padStart(2, `0`);
};