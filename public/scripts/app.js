// Client facing scripts here
$(document).ready(function() {
  const calendar = $('#calendar').evoCalendar({
    todayHighlight: true,
    calendarEvents: true,
    eventDisplayDefault: true,
    sidebarDisplayDefault: false,
    theme: 'royal-navy',
  });
  calendar.on('selectDate', function(newDate, oldDate) {
    var text = "";
    $("#eventform").submit(function(event) {
      event.preventDefault();
      text = $(this).find("#eventvalue").val();
      console.log(text);
      $("#eventvalue").val("");
    });
    $('#exampleModalCenter').modal('show').on(function () {
    });
  });
});
