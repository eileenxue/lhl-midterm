// Client facing scripts here

isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0 && year % 400 !==0 || (year % 100 === 0 && year % 400 === 0));
}

daysFeb = (year) => {
  return isLeapYear(year) ?  29 : 28;
}

let calendar = document.querySelector('.calendar');

generateCalendar = (month, year)  => {
  let calenderDays = document.querySelector('.calendar-days')
}
