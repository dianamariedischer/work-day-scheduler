// adding advanced format plugin to dayjs
dayjs.extend(dayjs_plugin_advancedFormat);

// code to display the current date in the header of the page.
var currentDay = dayjs().format("dddd, MMMM Do");
$('#current-day').text(currentDay);

// adds the calendar which encompassses all of the time blocks and their text areas
function initCalendar() {
  // loop that creates time blocks
  for (i=9; i<18; i++) {
    // create timeblock
    var timeBlock = $('<div>');
    
    // add classes and set attributes for current time block being created
    timeBlock.addClass('row time-block');
    timeBlock.attr('id', 'hour-' + i);

    // create time element
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

    // create save icon and save button elements
    var saveIcon = $('<i>');
    var saveButton = $('<button>');

    // set classes and attributes for icon and save button
    saveIcon.addClass('fas fa-save');
    saveIcon.attr('aria-hidden', 'true');
    saveButton.addClass('btn saveBtn col-2 col-md-1');
    saveButton.attr('aria-label', 'save');
    
    // add the save icon to the button, and both to the time block
    saveButton.append(saveIcon);
    timeBlock.append(saveButton);

    // add time block to main container
    $('#main').append(timeBlock);
  }
}

// running the function that initializes the calendar so that there's a blank calendar on the page
initCalendar();

// beginning this function in a call to jQuery ensures that it won't run until the HTML loads onto the page
$(function () {

  // creating a variable from all elements with the class "time-block"
  var timeBlockEl = $(".time-block");

  // listener for click events on any save buttons with the class .saveBtn
  timeBlockEl.on('click', '.saveBtn', function (event) {

    // get parent container of clicked save button
    selectedTimeBlock = $(this).parent();

    // saves the typed text to local storage as a JSON string, with the key being the id of the selected time block
    localStorage.setItem(selectedTimeBlock.attr("id"), JSON.stringify(selectedTimeBlock.children().eq(1).val()));
  });


  // get current hour in military time as an int for comparisons
  var currentHour = parseInt(dayjs().format('H'));

  // for loop that applies past present and future classes depending on current hour
  for (i=9; i<18; i++) {
    // go through the time blocks using the i to get each id
    var timeBlockPhase = $('#hour-' + i);

    // if i less than the current hour it's in the past, if it's the same it's the present, and otherwise it's the future
    // these statements use the classes in the css to change the styling accordingly
    // for current time, it adds a placeholder that says current hour through DOM traversal
    if (i < currentHour) {
      timeBlockPhase.addClass('past');
    } else if (i === currentHour) {
      timeBlockPhase.addClass('present');
      timeBlockPhase.children().eq(1).attr('placeholder', 'Current hour');
    } else {
      timeBlockPhase.addClass('future');
    }
  }

  // get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements
  for (i=9; i<18; i++) {
    var idOfBlock = "hour-" + i;
    var textInBlock = JSON.parse(localStorage.getItem(idOfBlock));

    if (textInBlock !== null) {
      $("#" + idOfBlock).children().eq(1).val(textInBlock);
    }

  }
});