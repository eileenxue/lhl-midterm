// Client facing scripts here
$('.opt').click(function(value) {
  const arg = $(document.getElementById(value.target.id));
  if(arg.hasClass("btn-light")) {
    arg.removeClass("btn-light").addClass(["btn-dark", "selected-times"]);
  } else {
    arg.removeClass(["btn-dark", "selected-times"]).addClass("btn-light");
  }
});

$(document).ready(function() {
  const calendar = $('#calendar').evoCalendar({
      todayHighlight: true,
      eventDisplayDefault: true,
      sidebarDisplayDefault: false,
      theme: 'midnight-blue',
  });
  calendar.on('selectDate', function(date) {
    $("#eventform").submit(function(event) {
      event.preventDefault();
      let calendarEvents = [];
      $(".selected-times").each(function() {
        $(this).removeClass(["btn-dark", "selected-times"]).addClass("btn-light");
        const calendarEvent = {
          id: this.id,
          name: this.value,
          date: calendar.evoCalendar('getActiveDate'),
          type: "event",
        };
        calendarEvents.push(calendarEvent);
      });
      calendar.evoCalendar('addCalendarEvent', calendarEvents);
      $('#exampleModalCenter').modal('toggle');
    });
    $('#exampleModalCenter').modal('show').on(function () {

    });
  });
});
