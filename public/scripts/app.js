$(document).ready(function() {
  let max_fields = 10;
  let wrapper = $('.input-container');
  let add_button = $('.add');

  let x = 1;
  $(add_button).on('click', function(e) {
    e.preventDefault();
    if (x < max_fields) {
      x++;
      $(wrapper).append('<input type="text" class="form-control" id="datetimefield" name="date-time">');
    }
  });
});

