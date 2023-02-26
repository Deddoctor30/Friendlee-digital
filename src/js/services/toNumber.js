export const toNumber = (value) => {
   return +(value).replace(/ /g,'').replace('₽', '')
}