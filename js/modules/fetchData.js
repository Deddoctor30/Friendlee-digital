import { toNumber } from "../services/toNumber";

const fetchData = () => {
   const form = document.querySelector('.inputs__form'),
         resultBtn = document.querySelector('.result-btn'),
         spinner = document.querySelector('.spinner'),
         btnContent = document.querySelector('.inpunts__btn-content');

   let json = 0;

   form.addEventListener('submit', (e) => {
      e.preventDefault();

      resultBtn.classList.add('disabled');
      resultBtn.setAttribute('disabled', true);
      disabledHandler();
      const formData = new FormData(form);

      const obj = {};
      formData.forEach(function(value, key) {
         obj[key] = toNumber(value);
      })

      json = JSON.stringify(obj); 
      setTimeout(showJs, 2000);

      function showJs() {
         alert(json)
         spinner.classList.toggle('hide');
         btnContent.classList.toggle('hide');
         resultBtn.removeAttribute('disabled');
         resultBtn.classList.remove('disabled');
         disabledHandler();
      }
   })

   function disabledHandler() {
      document.querySelectorAll(".inputs__input").forEach(item => {
         item.classList.toggle('disabled');
         if (item.hasAttribute('readonly') && !item.classList.contains('result-input')) {
            item.removeAttribute('readonly');
         } else {
            item.setAttribute('readonly', '');
         }
      })
   }

}

export default fetchData;