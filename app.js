document.addEventListener('DOMContentLoaded', function () {

  let countdown;
  let audio = new Audio("./audio/bell.mp3")
  const timeDisplay = document.querySelector(".display-time");
  const hourDisplay = document.querySelector(".display-hour");
  const buttons = document.querySelectorAll("[data-time]");

  function time(seconds) {
    // Clear any existing timers
    timeDisplay.style.color = "black";
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndHour(then);

    countdown = setInterval(() => {
      // Time left in seconds
      const secondsLeft = Math.round((then - Date.now()) / 1000);

      // Check if it should stop
      if (secondsLeft < 0) {
        clearInterval(countdown);
        return;
      }

      // Display
      displayTimeLeft(secondsLeft);

      if(secondsLeft < 10) {
        timeDisplay.style.color = "red";
      }

      if(secondsLeft === 0) {
        audio.play();
      }
    }, 1000);
  }

  function displayTimeLeft(seconds) {
    
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    console.log({minutes, remainderSeconds});
    const display = `${minutes}:${(remainderSeconds < 10 ? "0" : "")}${remainderSeconds}`;
    document.title = display;
    timeDisplay.textContent = display;
  }

  function displayEndHour(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    hourDisplay.textContent = `Break ends at ${hour}:${minutes < 10 ? "0" : ""}${minutes}`;
  }

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  time(seconds);
}

buttons.forEach(button => button.addEventListener("click", startTimer));

document.customForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const minutes = this.minutes.value;
  time(minutes * 60);
  this.reset();
})

});
