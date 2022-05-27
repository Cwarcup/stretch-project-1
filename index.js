let testData = [10, 35, 22, 55, 12];
let testOptions = {
  title: "Test Bar Chart",
  barColor: "#00ADB5",
  labels: ["Dog", "Cat", "Fish", "Monkey", "Human"],
  titleFontSize: "1.5em",
  titleColor: "#eeeeee",
  tickInterval: 10,
  gapSize: "10%",
};
let testElement = "#grid-chart";

const createBarChart = (data, options, element) => {
  const { title, barColor, labels, tickInterval, gapSize } = options;
  let numOfBars = data.length;
  let maxValue = Math.max(...data);

  // create rows and cols for grid
  $("#grid-chart").css({
    "grid-template-columns": `1fr repeat(${numOfBars + 1}, 1fr)`,
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
      <div class='dataLabel' style=' 
      grid-column: ${colStart} / ${colEnd}; 
      grid-row: ${maxValue + 2};
      '>${labels[i]}</div>
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
  if (didItChange("#newLabels")) {
    testOptions["labels"] = $("#newLabels").val().split(", ");
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
$(".setTitleColor").on("click", function () {
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

let stackedData = {
  appendElement: "stacked-grid",
  dataPoints: [
    {
      label: "Jan",
      data1: 10,
      data2: 20,
    },
    {
      label: "Feb",
      data1: 15,
      data2: 25,
    },
    {
      label: "Mar",
      data1: 20,
      data2: 30,
    },
  ],
  options: {
    title: "Test Bar Chart",
    barColor: "#00ADB5",
    titleFontSize: "1.5em",
    titleColor: "#eeeeee",
    tickInterval: 10,
    gapSize: "10%",
  },
};

const createStackedChart = function (data) {
  const { dataPoints, options } = data;
  const { title, barColor, titleFontSize, titleColor, tickInterval, gapSize } =
    options;

  let numOfBars = dataPoints.length;
  let maxValueCombined = getMaxValueCombined(dataPoints);

  // fn to get max value of any combined data points
  function getMaxValueCombined(data) {
    let maxVal = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i]["data1"] + data[i]["data2"] > maxVal) {
        maxVal = data[i]["data1"] + data[i]["data2"];
      }
    }
    return maxVal;
  }

  // create rows and cols for grid
  $("#stacked-grid").css({
    "grid-template-columns": `1fr repeat(${numOfBars + 1}, 1fr)`,
    "grid-template-rows": `repeat(${maxValueCombined}, auto) 20px`,
  });

  // grid gap
  $("#stacked-grid").css("grid-column-gap", `${gapSize}`);

  // add bars to gridchart between 2 / 3
  let colStart = 2;
  let colEnd = 3;
  let startingRow = maxValueCombined + 2;
  // for (let i = 0; i < numOfBars; i++) {
  for (let item of dataPoints) {
    console.log(item["data1"]);
    console.log(item["data2"]);
    $("#stacked-grid").append(
      `
      <div class='lowerBar' id='${item["data1"]}' value='${item["data1"]}'
      style='
        background: ${barColor};
        grid-column: ${colStart} / ${colEnd};
        grid-row: ${startingRow - item["data1"]} / ${maxValueCombined + 2};
        '></div>
      <div class='dataLabel' style='
      grid-column: ${colStart} / ${colEnd};
      grid-row: ${maxValueCombined + 2};
      '>${item["label"]}</div>
      `
    );
    colStart++;
    colEnd++;
  }
  // $("#stacked-grid").append(
  //   `
  //   <div class='lowerBar' id='${data[i]}' value='${data[i]}'
  //   style='
  //   background: ${barColor};
  //   grid-column: ${colStart} / ${colEnd};
  //   grid-row: ${startingRow - data[i]} / ${maxValue + 2};
  //   '></div>
  //   <div class='dataLabel' style='
  //   grid-column: ${colStart} / ${colEnd};
  //   grid-row: ${maxValue + 2};
  //   '>${labels[i]}</div>
  //   `
  // );
  colStart++;
  colEnd++;
  // }
};

createStackedChart(stackedData);
