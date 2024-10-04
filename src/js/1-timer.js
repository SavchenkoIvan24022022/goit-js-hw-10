import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn =  document.querySelector('[data-start]');
const inputDate = document.querySelector('#datetime-picker')
let intervalID = null;
let userSelectedDate = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const now = new Date();
console.log(userSelectedDate);
console.log(now);


        if (userSelectedDate < now) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topRight',
            });
            startBtn.disabled = true; 
        } else {
            startBtn.disabled = false; 
        }
    },
};

flatpickr("#datetime-picker", options);

 startBtn.disabled = true; 

 startBtn.addEventListener('click', startTimer);

function startTimer() {
    const targetDate = userSelectedDate.getTime(); 

    clearInterval(intervalID); 
    inputDate.disabled = true;
    startBtn.disabled = true; 
    intervalID = setInterval(() => {
        const now = new Date().getTime();
        const remainingTime = targetDate - now;

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        document.querySelector('[data-days]').textContent = String(days).padStart(2, '0');
        document.querySelector('[data-hours]').textContent = String(hours).padStart(2, '0'); 
        document.querySelector('[data-minutes]').textContent = String(minutes).padStart(2, '0'); 
        document.querySelector('[data-seconds]').textContent = String(seconds).padStart(2, '0'); 

        if (remainingTime < 1000) {
            clearInterval (intervalID);
            inputDate.disabled = false; 
        }
    }, 1000);
}
