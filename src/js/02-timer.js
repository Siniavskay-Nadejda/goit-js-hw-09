import '../css/common.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
let selectedDate = 0;
let timerId = 0;

const ref = {
  myInput: document.querySelector('input#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('.timer [data-days]'),
  dataHours: document.querySelector('.timer [data-hours]'),
  dataMinutes: document.querySelector('.timer [data-minutes]'),
  dataSeconds: document.querySelector('.timer [data-seconds]'),
};

ref.btnStart.addEventListener('click', start);

ref.btnStart.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      ref.btnStart.removeAttribute('disabled');
      console.log(selectedDate);
    }
  },
};

flatpickr('input#datetime-picker', options);

function start() {
  timerId = setInterval(() => {
    const targetDate = selectedDate - new Date();
    // console.log(targetDate);
    ref.btnStart.setAttribute('disabled', 'disabled');
    stopTimeOut(targetDate);
    const deltaTime = convertMs(targetDate);
    showDate(deltaTime);
  }, 1000);
}

function stopTimeOut(targetDate) {
  if (targetDate < 1000) {
    clearInterval(timerId);
    ref.myInput.removeAttribute('disabled');
    Notiflix.Notify.success('Time is out');
  }
}

function showDate(deltaTime) {
  ref.dataDays.textContent = pad(deltaTime.days);
  ref.dataHours.textContent = pad(deltaTime.hours);
  ref.dataMinutes.textContent = pad(deltaTime.minutes);
  ref.dataSeconds.textContent = pad(deltaTime.seconds);
}

function pad(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}



