document.addEventListener('DOMContentLoaded', function () {

  let countdown;
  let overtime;
  let audio = new Audio("./audio/bell.mp3")
  const display = document.querySelector(".display");
  const timeDisplay = document.querySelector(".display-time");
  const hourDisplay = document.querySelector(".display-hour");
  const buttons = document.querySelectorAll("[data-time]");

  function time(seconds) {
    // Clear any existing timers
    timeDisplay.style.color = "black";
    clearInterval(countdown);
    clearInterval(overtime);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndHour(then);


    countdown = setInterval(() => {
      // Time left in seconds
      const secondsLeft = Math.round((then - Date.now()) / 1000);

      // Check if it should stop and go over
      if (secondsLeft <= 0) {
        timeDisplay.style.color = "white";
        hourDisplay.style.color = "white";
        display.style.backgroundColor = "#e60000";
      }

      if (secondsLeft <= 0) {
        clearInterval(countdown);
        displayTimeOver();
        return;
      }

      // Display
      displayTimeLeft(secondsLeft);

      if (secondsLeft < 10) {
        timeDisplay.style.color = "red";
      }

      if (secondsLeft === 0) {
        audio.play();
      }
    }, 1000);
  }


  function displayTimeOver() {

    let minutesOver = 0;
    let secondsOver = 0;

    timeDisplay.textContent = "0:00";

    overtime = setInterval(() => {
      secondsOver++;
      if (secondsOver === 60) {
        secondsOver = 0;
        minutesOver++;
      }
      console.log({ minutesOver, secondsOver });
      let display = `-${minutesOver}:${((secondsOver < 10) ? "0" : "")}${secondsOver}`
      timeDisplay.textContent = display;
    }, 1000)

  }

  function displayTimeLeft(seconds) {

    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;

    console.log({ minutes, remainderSeconds });
    let display = `${minutes}:${((remainderSeconds < 10 && remainderSeconds >= 0) ? "0" : "")}${remainderSeconds}`;
    document.title = display;
    timeDisplay.textContent = display;

    if (remainderSeconds <= 0) {
      timeDisplay.style.color = "white";
      hourDisplay.style.color = "white";
      // display.style.backgroundColor = "#e60000";
    }
  }

  function displayEndHour(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    hourDisplay.textContent = `Koniec przerwy ${hour}:${minutes < 10 ? "0" : ""}${minutes}`;
  }

  function startTimer() {
    const seconds = parseInt(this.dataset.time);
    time(seconds);
    display.style.backgroundColor = "white";
    timeDisplay.style.color = "black";
    hourDisplay.style.color = "black";
  }

  buttons.forEach(button => button.addEventListener("click", startTimer));

  document.customForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const minutes = this.minutes.value;
    time(minutes * 60);
    this.reset();
    display.style.backgroundColor = "white";
    timeDisplay.style.color = "black";
    hourDisplay.style.color = "black";
  })

});
