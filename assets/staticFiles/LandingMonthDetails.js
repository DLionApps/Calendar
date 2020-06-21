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

const holidayTableCreateQuery =
  "CREATE TABLE Holiday (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, Year INTEGER NOT NULL, MonthNumber INTEGER NOT NULL, MonthText TEXT NOT NULL, Date INTEGER NOT NULL, Reason TEXT NOT NULL, IsPublic INTEGER NOT NULL DEFAULT 0, IsBank INTEGER NOT NULL DEFAULT 0, IsMercantile INTEGER NOT NULL DEFAULT 0);";

export { monthArray, monthDetail, dayArray, holidayTableCreateQuery };
