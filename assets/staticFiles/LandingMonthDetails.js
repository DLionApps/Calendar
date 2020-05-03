const dayObj = { date: 0, isMercantile: false, isPublic: false, isBank: false };
let weekArray = [dayObj, dayObj, dayObj, dayObj, dayObj, dayObj, dayObj];
let monthArray = [
  weekArray,
  weekArray,
  weekArray,
  weekArray,
  weekArray,
  weekArray,
];

export default monthArray;
