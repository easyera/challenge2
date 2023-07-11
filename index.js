$("input").keypress(function (event) {
  let keycode = event.which;
  if (keycode < 48 || keycode > 57) {
    if (keycode != 8) {
      return false;
    }
  }
});

function validateDate() {
  var day = parseInt($('input[name="day"]').val());
  var month = parseInt($('input[name="month"]').val());
  var year = parseInt($('input[name="year"]').val());

  var isValidDate = false;

  // Check if the year is a leap year
  var isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  // Check if the month is valid
  var isMonthValid = month >= 1 && month <= 12;

  // Check if the day is valid based on the month and year
  if (isMonthValid && year) {
    var maxDaysInMonth = 31;

    if (month === 4 || month === 6 || month === 9 || month === 11) {
      maxDaysInMonth = 30;
    } else if (month === 2) {
      maxDaysInMonth = isLeapYear ? 29 : 28;
    }

    isValidDate = day >= 1 && day <= maxDaysInMonth;
  }

  if (isValidDate) {
    $(".error").text("");
    var tot = calculateAge(year, month, day);
    if (tot.years !== NaN){
      $("#years").text(tot.years);
    }
    if (tot.months !== NaN){
      $("#months").text(tot.months);
    }
    if (tot.days !== NaN){
      $("#days").text(tot.days);
    }
    
  } else {
    $("#years").text("--");
    $("#months").text("--");
    $("#days").text("--");
    if (day) {
      $("#day").text("");
      if (month) {
        if (year) {
          $(".error").text("Must be a valid date");
        }else{
          $("#year").text("This field is required");
        }
      } else {
        $("#month").text("This field is required");
        !year ? $("#year").text("This field is required") : $("#year").text("");
      }
    } else {
      $("#day").text("This field is required");
      !month ? $("#month").text("This field is required") : $("#month").text("");
      !year ? $("#year").text("This field is required") : $("#year").text("");
    }
  }
}

function calculateAge(year, month, day) {
  var currentDate = new Date();
  var birthDate = new Date(year, month - 1, day);

  var years = currentDate.getFullYear() - birthDate.getFullYear();
  var months = currentDate.getMonth() - birthDate.getMonth();
  var days = currentDate.getDate() - birthDate.getDate();

  // Adjust for negative months or days
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    months--;
    days += new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
  }

  return {
    years: years,
    months: months,
    days: days
  };
}
