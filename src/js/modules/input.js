import {params} from '../services/rangeParams';
import {numberWithSpaces} from '../services/numConverter';
import inputValidation from '../services/inputValidation';

const input = () => {
   let minValue = 0;
   let maxValue = 0;


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
         item.value = numberWithSpaces(item.value)

      })
   });
   

   priceInput.addEventListener('input', (e) => {
      priceInput.value = numberWithSpaces(e.target.value);
      inputValidation(priceInput.value, priceInput, '1 500 000', '10 000 000', true)
      priceRange.value = (+(priceInput.value).replace(/ /g,'') - 1500000);
      params(priceRange)
      firstPaymentInput.value = numberWithSpaces(Math.round(+priceRange.value * 0.1));


      const value = +(priceInput.value).replace(/ /g,'');
      minValue = String(Math.floor(value * 0.1));
      maxValue = String(Math.floor(value * 0.6));

   })
   priceRange.addEventListener('input', () => {
      priceInput.value = numberWithSpaces(+priceRange.value + 1500000);
      firstPaymentInput.value = numberWithSpaces(Math.round(+(priceInput.value).replace(/ /g,'') * 0.1));
   })

   
   firstPaymentInput.addEventListener('input', (e) => {
      firstPaymentInput.value = numberWithSpaces(e.target.value);
      const value = +(priceInput.value).replace(/ /g,'');
      const minValue = String(value * 0.1);
      const maxValue = String(value * 0.6);
      
      inputValidation(firstPaymentInput.value, firstPaymentInput, minValue, maxValue, true)

      const paymentValue = +(firstPaymentInput.value).replace(/ /g,'');

      firstPymentProc.innerHTML = `${Math.floor((paymentValue / value)*100)}%`
   })
   firstPaymentRange.addEventListener('input', () => {
      const value = +(priceInput.value).replace(/ /g,'');
      const minValue = String(value * 0.1);
      const maxValue = String(value * 0.6);

      firstPaymentRange.min = minValue;
      firstPaymentRange.max = maxValue;

      firstPaymentInput.value = numberWithSpaces(Math.round(+firstPaymentRange.value));

      const paymentValue = +(firstPaymentRange.value).replace(/ /g,'');
      firstPymentProc.innerHTML = `${Math.floor((paymentValue / value)*100)}%`
   })
}

export default input;