import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector(`.form`);

formEl.addEventListener(`submit`, (evn) => {
  evn.preventDefault();

  const delayValue = parseInt(formEl.elements.delay.value);
  const stepValue = parseInt(formEl.elements.step.value);
  const amountValue = parseInt(formEl.elements.amount.value);

  for (let i = 0; i < amountValue; i += 1) {
    const positionPromise = i + 1;
    const promise = createPromise(positionPromise, delayValue + stepValue * i);
    promise.then((result) => {
      Notify.success(`✅ Fulfilled promise ${result.position} in ${result.delay}ms`);
    }).catch((result) => {
      Notify.failure(`❌ Rejected promise ${result.position} in ${result.delay}ms`);
    });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
