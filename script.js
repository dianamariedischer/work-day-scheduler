// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


// adds all of the time blocks and their text areas
function initCalendar() {
  // loop that creates timeblocks
  for (i=9; i<18; i++) {
    // create timeblock
    var timeBlock = $('<div>');
    
    // add classes and set attributes
    timeBlock.addClass('row time-block');
    timeBlock.attr('id', 'hour-' + i);

    // create times
    var timeText = $('<div>');
    timeText.addClass('col-2 col-md-1 hour text-center py-3');
     
    // if statement that determines if it's am or pm and reformats from military time
    if (i < 12) {
      timeText.text(i + 'AM');
    } else if (i === 12) {
      timeText.text(i + 'PM');
    } else {
      timeText.text(i - 12 + 'PM');
    }

    // add times to time block
    timeBlock.append(timeText);

    // create textArea
    var textArea = $('<textarea>');
    textArea.addClass('col-8 col-md-10 description');
    textArea.attr('rows', '3');
    
    // add text area to time block
    timeBlock.append(textArea);

    // <button class="btn saveBtn col-2 col-md-1" aria-label="save"> <i class="fas fa-save" aria-hidden="true"></i> </button>
    var saveIcon = $('<i>');
    saveIcon.addClass('fas fa-save');
    saveIcon.attr('aria-hidden', 'true');

    var saveButton = $('<button>');
    saveButton.addClass('btn saveBtn col-2 col-md-1');
    saveButton.attr('aria-label', 'save');
    saveButton.append(saveIcon);

    timeBlock.append(saveButton);

    // add time block to main container
    $('#main').append(timeBlock);
  }
}

initCalendar();


$(function () {

  var timeBlockEl = $(".time-block");

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  timeBlockEl.on('click', '.saveBtn', function (event) {

    event.preventDefault();

    //get parent container of clicked save button
    selectedTimeBlock = $(this).parent();

    localStorage.setItem(selectedTimeBlock.attr("id"), selectedTimeBlock.children().eq(1).val());
  });
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // get current hour in military time
  var currentHour = dayjs().format('H');

  // for loop that applies past present and future classes depending on time
  for (i=9; i<18; i++) {
    var timeBlock = $('#hour-' + i);

    if (i < currentHour) {
      timeBlock.addClass('past');
    } else if (i === currentHour) {
      timeBlock.addClass('present');
      timeBlock.children().eq(1).attr('placeholder', 'Current hour');
    } else {
      timeBlock.addClass('future');
    }
  }

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  for (i=9; i<18; i++) {
    var idOfBlock = "hour-" + i;
    var textInBlock = localStorage.getItem(idOfBlock);

    if (textInBlock !== null) {
      $("#" + idOfBlock).children().eq(1).val(textInBlock);
    }

  }

  // TODO: Add code to display the current date in the header of the page.
  var currentDay = dayjs().format("dddd - MM.DD.YYYY");
  $('#current-day').text(currentDay);
});