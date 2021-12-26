
import Notiflix from "notiflix";

const refs = {
  formEl: document.querySelector(".form")
 }
refs.formEl.addEventListener("submit", formSubmitPromis);

let position = 0
function formSubmitPromis(e) {
  e.preventDefault();
  let delay = Number(e.currentTarget.elements.delay.value);
  const step = Number(e.currentTarget.elements.step.value);
  const amount = Number(e.currentTarget.elements.amount.value);

  setInterval(() => {
    if (position == amount) {
      return
    }
    position += 1;
    setTimeout(() => {
     delay+= step
    })
    createPromise( position, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  },delay)
}

function createPromise(position, delay) {
  const promise = new Promise(( fulfilled, reject) => {
    setInterval(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
         fulfilled({ position, delay });
      }
      reject({ position, delay });
    }, delay)
  
  })
  return promise;
}

