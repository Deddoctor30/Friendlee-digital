import {params} from '../services/rangeParams'

const range = () => {

   const mySliders = document.querySelectorAll(".inputs__slider");
   window.addEventListener('load', () => {
      mySliders.forEach(item => {
         params(item);
      })
   });

   mySliders.forEach(item => {
      item.addEventListener('input', () => {
         if (document.querySelector('.valudation')) {
            document.querySelector('.valudation').remove()
         }
         params(item);
      })
   })

}

export default range;











