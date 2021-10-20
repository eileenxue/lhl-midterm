$(document).ready(function() {
  let max_fields = 10;
  let wrapper = $('.input-container');
  let add_button = $('.add');

  let x = 1;
  $(add_button).on('click', function(e) {
    e.preventDefault();
    if (x < max_fields) {
      x++;
      $(wrapper).append('<div class="row g-3 input-container"><div class="col-auto"><label for="datetimefield" class="col-form-label">Enter here:</label></div><div class="col-auto"><input type="text" id="datetimefield" class="form-control" placeholder="6 - 8PM Oct 20 2021" name="date-time"></div><div class="col-auto"><button type="button" class="add btn btn-primary">Add More Slots</button></div>');
    }
  });
});

