export const params = (item) => {
   let valPercent = Math.round((item.value / item.max)*100);
   item.style.background = `linear-gradient(to right, #FF9514 ${valPercent}%, #E1E1E1 ${valPercent}%)`;
}