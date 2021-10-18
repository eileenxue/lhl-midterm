// Client facing scripts here
  $('#calendar').evoCalendar({
    'theme': 'Midnight Blue',
    todayHighlight: true,
    calendarEvents: true,
    eventDisplayDefault: true
  }).on('selectDate', function(newDate, oldDate) {
    prompt("Enter event time: ");
  })/*.on('click', function(selectDate) {
    alert("Hello");
  });*/
