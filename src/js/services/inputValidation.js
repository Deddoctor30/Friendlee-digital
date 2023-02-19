const inputValidation = (value, position, minValue, maxValue, isNumber = true) => {

   if (document.querySelector('.valudation')) {
      document.querySelector('.valudation').remove()
   }
   if (+(value).replace(/ /g,'') < minValue) {
      const validError = document.createElement('p');
      validError.classList.add('valudation')
      validError.innerHTML = `Минимальное значение ${minValue}`;
      validError.style.cssText = `
      position: absolute;
      top: 125px;
      left: 50px;
      margin: 0px 0px 2px 14px;
      color: red;
      `;
      position.after(validError)
   }
   if (+(value).replace(/ /g,'') > maxValue) {
      const validError = document.createElement('p');
      validError.classList.add('valudation')
      validError.innerHTML = `Максимальное значение ${maxValue}`;
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
      if (isNaN(+(value).replace(/ /g,''))) {
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