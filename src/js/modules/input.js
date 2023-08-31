import { params } from '../services/rangeParams';
import { toSpaces } from '../services/toSpaces';
import { toNumber } from '../services/toNumber';
import inputValidation from '../services/inputValidation';

const input = () => {
   let percentValue = 13;
   const priceInput = document.querySelector('#price'),
         firstPaymentInput = document.querySelector('#first-payment'),
         termInput = document.querySelector('#term'),
         priceRange= document.querySelector('#priceRange'),
         firstPaymentRange = document.querySelector('#firstPaymentRange'),
         termRange = document.querySelector('#termRange'),
         firstPymentProc = document.querySelector('.inputs__first-payment'),
         leasingSum = document.querySelector('#leasing'),
         montlyPayment = document.querySelector('#payment'),
         btnContent = document.querySelector('.inpunts__btn-content'),
         resultBtn = document.querySelector('.result-btn');
   const myInputs = document.querySelectorAll(".inputs__input, .results__input");
   window.addEventListener('load', () => {
      myInputs.forEach(item => {
         if (item.classList.contains('ruble')) {
            item.value = toSpaces(item.value) + ' ₽'
         } else {
            item.value = toSpaces(item.value)
         }
      })
   });
   priceInput.addEventListener('input', (e) => {
      priceInput.value = toSpaces(e.target.value);
      inputValidation(priceInput.value, priceInput, '1 500 000', '10 000 000', true)
      priceRange.value = toNumber(priceInput.value);
      firstPaymentInput.value = toSpaces(Math.round(toNumber(priceInput.value) * (percentValue*0.01))) + ' ₽';
      params(priceRange)
      leasingFunc()
   })
   priceRange.addEventListener('input', () => {
      priceInput.value = toSpaces(+priceRange.value);
      firstPaymentInput.value = toSpaces(Math.round(toNumber(priceInput.value) * (percentValue*0.01))) + ' ₽';
      leasingFunc()
   })

   // Второй инпут
   firstPaymentInput.addEventListener('input', (e) => {
      firstPaymentInput.value = toSpaces(e.target.value) + ' ₽';
      const value = toNumber(priceInput.value);
      const minValue = String(Math.round(value * 0.1));
      const maxValue = String(Math.round(value * 0.6));
      inputValidation(firstPaymentInput.value, firstPaymentInput, minValue, maxValue, true)
      percentValue = Math.floor((toNumber(firstPaymentInput.value) / toNumber(priceInput.value)*100))
      firstPymentProc.innerHTML = `${percentValue}%`
      firstPaymentRange.value = percentValue;
      params(firstPaymentRange)
      leasingFunc()
   })

   firstPaymentRange.addEventListener('input', () => {
      percentValue = +firstPaymentRange.value;
      firstPaymentInput.value = `${toSpaces(Math.floor(toNumber(priceInput.value) * (percentValue*0.01)))} ₽`
      firstPymentProc.innerHTML = `${percentValue}%`
      leasingFunc()
   })

   window.addEventListener("hashchange", function(e) {
      console.log('da');
    })

   // Третий инпут
   termInput.addEventListener('input', () => {
      inputValidation(termInput.value, termInput, '6', '120', true);
      termRange.value = termInput.value;
      params(termRange)
      leasingFunc()
   })
   termRange.addEventListener('input', () => {
      termInput.value = +termRange.value;
      leasingFunc()
   })
   const leasingFunc = () => {
      const payment = Math.floor((toNumber(priceInput.value) - toNumber(firstPaymentInput.value)) * (0.05 * Math.pow((1 + 0.05), toNumber(termInput.value)) / (Math.pow((1 + 0.05), toNumber(termInput.value)) - 1)));
      const leasing = toNumber(firstPaymentInput.value) + (toNumber(termInput.value) * payment);
      leasingSum.value = `${(toSpaces(leasing))} ₽`;
      montlyPayment.value = `${toSpaces(payment)} ₽`;
   }
   leasingFunc()
   resultBtn.addEventListener('click', () => {
      document.querySelector('.spinner').classList.toggle('hide');
      btnContent.classList.toggle('hide')
   })
}

export default input;