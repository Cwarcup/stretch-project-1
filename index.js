let testData = [10, 20, 30, 55, 23];
let testOptions = {
  title: "Test Bar Chart",
  barColor: "#00ADB5",
  labels: ["One", "Two", "three"],
  titleFontSize: "1.5em",
  titleColor: "#222831",
  tickInterval: 10,
  gapSize: "100px",
};
let testElement = "#grid-chart";

const createBarChart = (data, options, element) => {
  const { title, barColor, labels, tickInterval, gapSize } = options;
  let numOfBars = data.length;
  let maxValue = Math.max(...data);

  // create rows and cols for grid
  $("#grid-chart").css({
    "grid-template-columns": `50px repeat(${numOfBars + 1}, auto`,
    "grid-template-rows": `repeat(${maxValue}, auto) 20px`,
  });

  $("#grid-chart").css("grid-column-gap", `${gapSize}`);

  // add bars to gridchart between 2 / 3
  let colStart = 2;
  let colEnd = 3;
  let startingRow = maxValue + 2;
  for (let i = 0; i < numOfBars; i++) {
    $("#grid-chart").append(
      `
      <div class='single-bar' id='${data[i]}' value='${data[i]}' 
      style='
      background: ${barColor}; 
      grid-column: ${colStart} / ${colEnd}; 
      grid-row: ${startingRow - data[i]} / ${maxValue + 2};
      '></div>
      `
    );
    colStart++;
    colEnd++;
  }

  // y axis ticks
  let maxRow = maxValue;
  for (let i = 0; i <= maxValue; i += tickInterval) {
    $("#grid-chart").append(
      `
      <div style='
      grid-column: 1 / 2;
      grid-row: ${maxRow + 1} / ${maxRow + 2}'>${i}
      </div>
      `
    );
    maxRow -= tickInterval;
  }

  // set title
  $(".grid-title").text(title);
  $(".grid-title").css("color", `${testOptions.titleColor}`);
  $(".grid-title").css("font-size", `${testOptions.titleFontSize}`);

  // end of initial setup
};
createBarChart(testData, testOptions, testElement);

//clear input field
const clearInput = function (selector) {
  $(selector).val("");
};

// update title
const titleChange = function () {
  $(".grid-title").text($("#titleVal").val());
  clearInput("#titleVal");
};

// change title btn
$(".titleBtn").on("click", function () {
  titleChange();
});

// remove title
$("input[type=checkbox]").change(function () {
  if (this.checked) {
    $(".grid-title").text("");
  } else {
    $(".grid-title").text("Bar Chart");
  }
});

// check to see if a input field has changed
const didItChange = function (selector) {
  let newVal = $(selector).val();
  if (newVal === "" || newVal === undefined) {
    return false;
  } else {
    return true;
  }
};

// const updateGraph = function (newData, newOptions, testElement) {};

// update graph with any options that have been changed
$(".update-graph").on("click", function () {
  // check for new title
  if (didItChange("#titleVal")) {
    testOptions["title"] = $("#titleVal").val();
  }

  if (didItChange("#newData")) {
    $(".single-bar").empty();
    testData = $("#newData")
      .val()
      .split(",")
      .map(function (item) {
        return parseInt(item, 10);
      });
  }

  if (didItChange("#tickInterval")) {
    testOptions["tickInterval"] = parseInt($("#tickInterval").val());
  }

  if (didItChange("#titleSize")) {
    testOptions["titleFontSize"] = $("#titleSize").val();
  }

  if (didItChange("#colorPicker")) {
    testOptions["barColor"] = $("#colorPicker").val();
  }

  if (didItChange("#titleColor")) {
    testOptions["titleColor"] = $("#titleColor").val();
  }

  if (didItChange("#gapSize")) {
    testOptions["gapSize"] = $("#gapSize").val();
  }

  console.log(testOptions);
  console.log(testData);

  $("#grid-chart").empty();

  createBarChart(testData, testOptions, testElement);
});

// setting bar colours
$(".setBarColor").on("click", function () {
  testOptions["barColor"] = $("#colorPicker").val();
  $(".single-bar").css("background", testOptions["barColor"]);
});

// setting title colour
$(".setColor").on("click", function () {
  testOptions["titleColor"] = $("#titleColor").val();
  $(".grid-title").css("color", testOptions["titleColor"]);
});

// // Options dropdown
// let dropdownPresent = false;
// $(".options").hide();
// $(".showOptions").on("click", function () {
//   if (!dropdownPresent) {
//     $(".options").fadeIn();
//     dropdownPresent = true;
//   } else {
//     $(".options").fadeOut();
//     dropdownPresent = false;
//   }
// });

// silly hidden delay when hovering over title
let delay = 1000,
  setTimeoutConst;
$(".grid-title").hover(
  function () {
    setTimeoutConst = setTimeout(function () {
      $(".grid-title").text("To The Moon 🚀");
    }, delay);
  },
  function () {
    clearTimeout(setTimeoutConst);
  }
);
