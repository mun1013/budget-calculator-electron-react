const moment = require('moment');

const populateYears = () => {
  let date = new Date();
  let year = date.getFullYear();
  let yearList = [];

  for (let i = 0; i <= 10; i++) {
    yearList.push({ text: year - i, value: year - i });
  }

  return yearList;
}

const populateMonths = () => {
   let monthList = [];
   moment.months().map((item, index) => monthList.push({ text: item, value: index + 1 }));
   return monthList;
 }

module.exports = {populateYears, populateMonths};

