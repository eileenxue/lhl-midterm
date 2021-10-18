// Client facing scripts here
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 110abd56d1eeef9793b73d9b5f5678cdcaeeb8eb
$(document).ready(function() {
  $('#calendar').evoCalendar({
    theme: 'Midnight Blue',
    todayHighlight: true,
    calendarEvents: true,
    eventDisplayDefault: true
  })
})
=======

isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0 && year % 400 !==0 || (year % 100 === 0 && year % 400 === 0));
}

daysFeb = (year) => {
  return isLeapYear(year) ?  29 : 28;
}

let calendar = document.querySelector('.calendar');
>>>>>>> ff3f6cefb1c9639d2f69f1083a701f42d2c82258
