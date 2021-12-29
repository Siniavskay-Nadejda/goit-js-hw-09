
import Notiflix from "notiflix";

const formEl = document.querySelector(".form")
  
let formInputValue = {}

 formEl.addEventListener("input", formInput);
 formEl.addEventListener("submit", formSubmitPromis);
 
 function formInput(e) {
  formInputValue[e.target.name]=e.target.value
}
function formSubmitPromis(e) {
  e.preventDefault();
  const amount = Number(formInputValue.amount);
  const delay1 = Number(formInputValue.delay);
  const step = Number(formInputValue.step)
  for (let i = 0; i < amount; i += 1) {
    const position = i + 1
    const delay = delay1 + step * i
    createPromise(position, delay)
      .then(() => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(() => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
   const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
       if (shouldResolve) {
    resolve("success");
      } else {
        reject("error");
  }
    }, delay);
  });
}





