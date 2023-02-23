import {toSpaces} from '../services/toSpaces';
import { toNumber } from '../services/toNumber';

const inputValidation = (value, position, minValue, maxValue, isNumber = true) => {

   if (document.querySelector('.valudation')) {
      document.querySelector('.valudation').remove()
   }
   if (toNumber(value) < toNumber(minValue)) {
      const validError = document.createElement('p');
      validError.classList.add('valudation')
      validError.innerHTML = `Минимальное значение ${toSpaces(minValue)}`;
      validError.style.cssText = `
      position: absolute;
      top: 125px;
      left: 50px;
      margin: 0px 0px 2px 14px;
      color: red;
      `;
      position.after(validError)
   }
   if (toNumber(value) > toNumber(maxValue)) {
      const validError = document.createElement('p');
      validError.classList.add('valudation')
      validError.innerHTML = `Максимальное значение ${toSpaces(maxValue)}`;
      validError.style.cssText = `
      position: absolute;
      top: 125px;
      left: 50px;
      margin: 0px 0px 2px 14px;
      color: red;
      `;
      position.before(validError)
   }
   if (isNumber) {
      if (isNaN(+(value).replace(/ /g,'').replace('₽', ''))) {
         const validError = document.createElement('p');
         validError.classList.add('valudation')
         validError.innerHTML = `Введите числовое значение`;
         validError.style.cssText = `
         position: absolute;
         top: 125px;
         left: 50px;
         margin: 0px 0px 2px 14px;
         color: red;
         `;
         position.before(validError)
      }
   }
}

export default inputValidation;