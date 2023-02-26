export function toSpaces(x) {
   return x.toString().replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
 }