import {params} from '../services/rangeParams';
import {toSpaces} from '../services/toSpaces';
import { toNumber } from '../services/toNumber';
import inputValidation from '../services/inputValidation';

const input = () => {
   let minValue = 0;
   let maxValue = 0;

   priceRangeValue = 0;


   const priceInput = document.querySelector('#price'),
         firstPaymentInput = document.querySelector('#first-payment'),
         termInput = document.querySelector('#term'),
         priceRange= document.querySelector('#priceRange'),
         firstPaymentRange = document.querySelector('#firstPaymentRange'),
         termRange = document.querySelector('#termRange'),
         firstPymentProc = document.querySelector('.inputs__first-payment');

   const myInputs = document.querySelectorAll(".inputs__input, .results__input");


   window.addEventListener('load', () => {
      myInputs.forEach(item => {
         item.value = toSpaces(item.value)

      })
   });

   priceInput.addEventListener('input', (e) => {
      priceInput.value = toSpaces(e.target.value);
      inputValidation(priceInput.value, priceInput, '1 500 000', '10 000 000', true)
      priceRange.value = toNumber(priceInput.value) - 1500000;
      params(priceRange)
      firstPaymentInput.value = toSpaces(Math.round(+priceRange.value * 0.1));


      const value = toNumber(priceInput.value);
      minValue = String(Math.floor(value * 0.1));
      maxValue = String(Math.floor(value * 0.6));

   })
   priceRange.addEventListener('input', () => {
      priceInput.value = toSpaces(+priceRange.value + 1500000);
      firstPaymentInput.value = toSpaces(Math.round(toNumber(priceInput.value) * 0.1));
   })

   
   firstPaymentInput.addEventListener('input', (e) => {
      firstPaymentInput.value = toSpaces(e.target.value);
      const value = toNumber(priceInput.value);
      const minValue = String(value * 0.1);
      const maxValue = String(value * 0.6);
      
      inputValidation(firstPaymentInput.value, firstPaymentInput, minValue, maxValue, true)

      const paymentValue = toNumber(firstPaymentInput.value);

      firstPymentProc.innerHTML = `${Math.floor((paymentValue / value)*100)}%`
   })
   firstPaymentRange.addEventListener('input', () => {
      const value = toNumber(priceInput.value);
      const minValue = String(value * 0.1);
      const maxValue = String(value * 0.6);

      firstPaymentRange.min = minValue;
      firstPaymentRange.max = maxValue;

      firstPaymentInput.value = toSpaces(Math.round(+firstPaymentRange.value));

      const paymentValue = toNumber(firstPaymentRange.value);
      firstPymentProc.innerHTML = `${Math.floor((paymentValue / value)*100)}%`
   })
}

export default input;