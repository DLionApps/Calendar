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

const dayArray = [
  { name: "MON" },
  { name: "TUE" },
  { name: "WED" },
  { name: "THU" },
  { name: "FRI" },
  { name: "SAT" },
  { name: "SUN" },
];

const monthDetail = {
  currentMonth: "Month loading",
  currentYear: "Year loading",
  currentMonthNumber: 0,
};

export { monthArray, monthDetail, dayArray };
