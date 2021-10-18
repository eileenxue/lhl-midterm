// Client facing scripts here
  $('#calendar').evoCalendar({
    'theme': 'Midnight Blue',
    todayHighlight: true,
    calendarEvents: true,
    eventDisplayDefault: true
  }).on('selectDate', function(newDate, oldDate) {
    //prompt("Enter event time: ");
      $('#exampleModalCenter').modal('show').on('shown.bs.modal', function () {
        $('.modal-body');
      });
  });
