import {params} from '../services/rangeParams';
import {toSpaces} from '../services/toSpaces';
import { toNumber } from '../services/toNumber';
import inputValidation from '../services/inputValidation';

const input = () => {

   let percentValue = 13;
   let secondInputValue = 0;


   const priceInput = document.querySelector('#price'),
         firstPaymentInput = document.querySelector('#first-payment'),
         termInput = document.querySelector('#term'),
         priceRange= document.querySelector('#priceRange'),
         firstPaymentRange = document.querySelector('#firstPaymentRange'),
         termRange = document.querySelector('#termRange'),
         firstPymentProc = document.querySelector('.inputs__first-payment'),
         leasingSum = document.querySelector('#leasingSum'),
         rubleSymbol = document.querySelector('#first-payment-label'),
         montlyPayment = document.querySelector('#montlyPayment');

   const myInputs = document.querySelectorAll(".inputs__input, .results__input");

   window.addEventListener('load', () => {
      myInputs.forEach(item => {
         item.value = toSpaces(item.value)

      })
   });

   // Первый инпут
   priceInput.addEventListener('input', (e) => {
      priceInput.value = toSpaces(e.target.value);
      
      inputValidation(priceInput.value, priceInput, '1 500 000', '10 000 000', true)
      priceRange.value = toNumber(priceInput.value);
      firstPaymentInput.value = toSpaces(Math.round(toNumber(priceInput.value) * (percentValue*0.01)));
      params(priceRange)
      leasingFunc()
   })
   priceRange.addEventListener('input', () => {
      priceInput.value = toSpaces(+priceRange.value);
      firstPaymentInput.value = toSpaces(Math.round(toNumber(priceInput.value) * (percentValue*0.01)));
      leasingFunc()
   })

   // Второй инпут
   firstPaymentInput.addEventListener('input', (e) => {
      let x = `${toSpaces(e.target.value)} ₽`;

      firstPaymentInput.value = x;
      
      const value = toNumber(priceInput.value);
      const minValue = String(Math.round(value * 0.1));
      const maxValue = String(Math.round(value * 0.6));
      
      inputValidation(firstPaymentInput.value, firstPaymentInput, minValue, maxValue, true)
      percentValue = Math.floor((toNumber(firstPaymentInput.value) / toNumber(priceInput.value)*100))
      firstPymentProc.innerHTML = `${percentValue}%`
      firstPaymentRange.value = percentValue;
      params(firstPaymentRange)
      leasingFunc()

      document.addEventListener('keydown', (e) => {
         e.preventDefault();
         if(e.key === 'Backspace') {
            firstPaymentInput.value = x.slice(0, -1);
         }
      })
   })
   firstPaymentRange.addEventListener('input', () => {
      percentValue = +firstPaymentRange.value;
      firstPaymentInput.value = `${toSpaces(Math.floor(toNumber(priceInput.value) * (percentValue*0.01)))} ₽`
      firstPymentProc.innerHTML = `${percentValue}%`
      leasingFunc()
      // rubleSymbolFunc()
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
      const payment = Math.floor((toNumber(priceInput.value) - toNumber(firstPaymentInput.value)) * (0.05 * Math.pow((1 + 0.05), toNumber(termInput.value)) / (Math.pow((1 + 0.05), toNumber(termInput.value)) - 1)))
      const leasing = toNumber(firstPaymentInput.value) + (toNumber(termInput.value) * payment)
      leasingSum.value = toSpaces(leasing)
      montlyPayment.value = toSpaces(payment)
   }
   leasingFunc()

   // const rubleSymbolFunc = () => {
   //    let value = `${(firstPaymentInput.value.length * 8) + 95}px`;
   //    document.querySelector('.reserv').style.setProperty('--sq-value', value)
   // }
   // rubleSymbolFunc()
}

export default input;