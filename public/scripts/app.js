// Client facing scripts here
// const valueAsKey = function(hours, minutes) {
//     let time = Math.floor(hours/12) == 1 ? 'PM' : 'AM';
//     return ((hours+11) % 12 + 1) + ":" + (minutes < 10 ? '0' : "") + minutes + ' ' + time;
// }

// const getAllTimes = function() {
//     let times = [];
//     for (let i = 0 ; i < 24; i++) {
//         for(let j = 0; j < 60; j += 30) {
//             let value = i + "-" + j;
//             const key = valueAsKey(i, j);
//             if(times.length > 0) {
//                 times[times.length-1][1] += " - " + key;
//             }
//             times.push([value, key]);
//         }
//     }
//     times[47][1] += " - 12:00 AM";
//     return times;
// }

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
