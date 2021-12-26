function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStartEl = document.querySelector("[data-start]")

const btnStopEl = document.querySelector("[data-stop]")



const timer = {
    intervalId: null,
    isActive: false,
    start() {
        if (this.isActive) {
            return;
        } 
    this.isActive = true;    
    this.intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor()
    }, 1000)
    },
    stop() {
        clearInterval(this.intervalId)
         this.isActive = false
    }
}

btnStartEl.addEventListener("click", timer.start.bind(timer))
btnStopEl.addEventListener("click",timer.stop.bind(timer))
