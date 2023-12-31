import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Функція оновлення дисплея таймера
function updateTimerDisplay(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / 1000 / 3600) % 24);
  const days = Math.floor(ms / 1000 / 3600 / 24);

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

// Функція обчислення різниці в часі 
function calculateTimeDifference(selectedDate) {
  const currentDate = new Date();
  return selectedDate.getTime() - currentDate.getTime();
}

// Функція перевірки дати в майбутньому
function isFutureDate(selectedDate) {
  const currentDate = new Date();
  return selectedDate > currentDate;
}

// Керування вибором дати
function handleDateSelection(selectedDates) {
  if (selectedDates.length > 0) {
    const selectedDate = selectedDates[0];
    if (isFutureDate(selectedDate)) {
      document.querySelector('[data-start]').removeAttribute('disabled');
    } else {
      window.alert('Please choose a date in the future');
      document.querySelector('[data-start]').setAttribute('disabled', 'true');
    }
  }
}

// Ініціалізація Flatpickr за допомогою обробників подій
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: handleDateSelection,
};
flatpickr("#datetime-picker", options);

let intervalId;

// Event listener для "Start" button
document.querySelector('[data-start]').addEventListener('click', () => {
  let inputDateValue = document.querySelector('#datetime-picker').value;
  if (!inputDateValue) {
    alert('Please choose a valid date');
    return;
  }

  let selectedDate = new Date(inputDateValue);
  if (!isFutureDate(selectedDate)) {
    alert('Please choose a date in the future');
    return;
  }

  let timeDifference = calculateTimeDifference(selectedDate);
  updateTimerDisplay(timeDifference);


  document.querySelector('[data-start]').setAttribute('disabled', 'true');
  document.querySelector('#datetime-picker').setAttribute('disabled', 'true');
  

intervalId = setInterval(() => {
    if (timeDifference <= 0) {
      clearInterval(intervalId);
      document.querySelector('[data-start]').removeAttribute('disabled');
      document.querySelector('#datetime-picker').removeAttribute('disabled');
    } else {
      updateTimerDisplay(timeDifference);
      timeDifference -= 1000;
    }
  }, 1000);
});





