export const params = (item) => {
   let valPercent = Math.round(((100/(item.max-item.min))*(item.value - item.min)));
   item.style.background = `linear-gradient(to right, #FF9514 ${valPercent}%, #E1E1E1 ${valPercent}%)`;
}