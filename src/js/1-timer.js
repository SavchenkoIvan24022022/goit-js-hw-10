import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null; 

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        const now = new Date();

        if (userSelectedDate < now) {
            alert("Please choose a date in the future");
            document.querySelector('[data-start]').disabled = true; 
        } else {
            document.querySelector('[data-start]').disabled = false; 
        }
    },
};

flatpickr("#datetime-picker", options);

document.querySelector('[data-start]').disabled = true; 

document.querySelector('[data-start]').addEventListener('click', startTimer);

function startTimer() {
    const targetDate = userSelectedDate.getTime(); 

    clearInterval(window.timerInterval); 

    window.timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const remainingTime = targetDate - now;

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    
        document.querySelector('[data-days]').textContent = days; // Дні
        document.querySelector('[data-hours]').textContent = String(hours).padStart(2, '0'); 
        document.querySelector('[data-minutes]').textContent = String(minutes).padStart(2, '0'); 
        document.querySelector('[data-seconds]').textContent = String(seconds).padStart(2, '0'); 

        if (remainingTime < 0) {
            clearInterval(window.timerInterval);
            document.querySelector('.timer').innerHTML = '<span style="color: red;">Час вичерпано!</span>';
            document.querySelector('[data-start]').disabled = true; 
        }
    }, 1000);
}
