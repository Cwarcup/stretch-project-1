let defaultData = [10, 35, 22, 55, 12];
let defaultOptions = {
  title: "Test Bar Chart",
  barColor: "#00ADB5",
  labels: ["Dog", "Cat", "Fish", "Monkey", "Human"],
  titleFontSize: "1.5em",
  titleColor: "#eeeeee",
  tickInterval: 10,
  gapSize: "10%",
};
let defaultElement = "#grid-chart";

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
  $(".grid-title").css("color", `${defaultOptions.titleColor}`);
  $(".grid-title").css("font-size", `${defaultOptions.titleFontSize}`);

  // end of initial setup
};

createBarChart(defaultData, defaultOptions, defaultElement);

//clear input field
const clearInput = function (selector) {
  $(selector).val("");
};

// update title
const titleChange = function (selector) {
  $(selector).text($("#titleVal").val());
  clearInput("#titleVal");
};

// change title btn on single bar chart
$(".titleBtn").on("click", function () {
  titleChange(".grid-title");
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

// update graph with any options that have been changed
$(".update-graph").on("click", function () {
  // check for new title
  if (didItChange("#titleVal")) {
    defaultOptions["title"] = $("#titleVal").val();
  }

  if (didItChange("#newData")) {
    $(".single-bar").empty();
    defaultData = $("#newData")
      .val()
      .split(",")
      .map(function (item) {
        return parseInt(item, 10);
      });
  }

  if (didItChange("#tickInterval")) {
    defaultOptions["tickInterval"] = parseInt($("#tickInterval").val());
  }
  if (didItChange("#newLabels")) {
    defaultOptions["labels"] = $("#newLabels").val().split(", ");
  }

  if (didItChange("#titleSize")) {
    defaultOptions["titleFontSize"] = $("#titleSize").val();
  }

  if (didItChange("#colorPicker")) {
    defaultOptions["barColor"] = $("#colorPicker").val();
  }

  if (didItChange("#titleColor")) {
    defaultOptions["titleColor"] = $("#titleColor").val();
  }

  if (didItChange("#gapSize")) {
    defaultOptions["gapSize"] = $("#gapSize").val();
  }

  $("#grid-chart").empty();

  createBarChart(defaultData, defaultOptions, defaultElement);
});

// setting bar colours
$(".setBarColor").on("click", function () {
  defaultOptions["barColor"] = $("#colorPicker").val();
  $(".single-bar").css("background", defaultOptions["barColor"]);
});

// setting title colour
$(".setTitleColor").on("click", function () {
  defaultOptions["titleColor"] = $("#titleColor").val();
  $(".grid-title").css("color", defaultOptions["titleColor"]);
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
    title: "Stacked Bar Chart",
    lowerBarColor: "#00ADB5",
    upperBarColor: "#4287f5",
    titleFontSize: "1.5em",
    titleColor: "#eeeeee",
    tickInterval: 10,
    gapSize: "10%",
  },
};

const dataPoint = {
  label: "Data",
  data1: 0,
  data2: 0,
};

const createStackedChart = function (data) {
  const { dataPoints, options } = data;
  const {
    title,
    lowerBarColor,
    upperBarColor,
    titleFontSize,
    titleColor,
    tickInterval,
    gapSize,
  } = options;

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
  for (let item of dataPoints) {
    let start = startingRow - item["data1"];
    $("#stacked-grid").append(
      `
      <div class='lowerBar' id='${item["data1"]}' value='${item["data1"]}'
      style='
        background: ${lowerBarColor};
        grid-column: ${colStart} / ${colEnd};
        grid-row: ${startingRow - item["data1"]} / ${maxValueCombined + 2};
        '></div>
      <div class='dataLabel' style='
      grid-column: ${colStart} / ${colEnd};
      grid-row: ${maxValueCombined + 2};
      '>${item["label"]}</div>
      
      <div class='upperBar' id='${item["data2"]}' value='${item["data2"]}'
      style='
        background: ${upperBarColor};
        grid-column: ${colStart} / ${colEnd};
        grid-row: ${start - item["data2"]} / ${start + 2};
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

  // y axis
  let maxRow = maxValueCombined;
  for (let i = 0; i <= maxValueCombined; i += tickInterval) {
    $("#stacked-grid").append(
      `
      <div style='
      grid-column: 1 / 2;
      grid-row: ${maxRow + 1} / ${maxRow + 2}'>${i}
      </div>
      `
    );
    maxRow -= tickInterval;
  }

  // set title from data
  $("#stacked-title").text(title);
  $("#stacked-title").css("color", `${titleColor}`);
  $("#stacked-title").css("font-size", `${titleFontSize}`);

  // end of initial setup
};

// initialize stacked bar chart with default data
createStackedChart(stackedData);

// update graph with any options that have been changed
$("#update-stacked-graph").on("click", function () {
  let { dataPoints, options } = stackedData;
  // check for data1 and data2 and label updates
  if (
    didItChange("#data1") &&
    didItChange("#data2") &&
    didItChange("#stackedLabels")
  ) {
    getDataPoints(dataPoints, "#data1");
    getDataPoints(dataPoints, "#data2");
    getLabels(dataPoints);

    // check for only data1 updates
  } else if (didItChange("#data1")) {
    getDataPoints(dataPoints, "#data1");

    // check for only data2 updates
  } else if (didItChange("#data2")) {
    getDataPoints(dataPoints, "#data2");

    // label change
  } else if (didItChange("#stackedLabels")) {
    getLabels(dataPoints);
  }

  // y axis intervals
  if (didItChange("#stackTickInterval")) {
    options["tickInterval"] = parseInt($("#stackTickInterval").val());
  }

  if (didItChange("#stackedTitleSize")) {
    options["titleFontSize"] = $("#stackedTitleSize").val();
  }

  if (didItChange("#lowerBarColor")) {
    options["lowerBarColor"] = $("#lowerBarColor").val();
  }

  if (didItChange("#stackedTitleColor")) {
    options["titleColor"] = $("#stackedTitleColor").val();
  }

  if (didItChange("#stackedGapSize")) {
    options["gapSize"] = $("#stackedGapSize").val();
  }

  if (didItChange("#stackedTitleVal")) {
    options["title"] = $("#stackedTitleVal").val();
  }

  $("#stacked-grid").empty();
  createStackedChart(stackedData);
});

const getDataPoints = function (dataArr, dataSub) {
  let newDataLength = $(dataSub).val().split(",").length;

  if (newDataLength > dataArr.length) {
    dataArr.push(Object.create(dataPoint));
  }

  let index = 0;
  for (let item of dataArr) {
    let newVal = parseInt($(dataSub).val().split(",")[index]);
    item["" + `${dataSub.slice(1)}` + ""] = newVal;
    index++;
  }
};

const getLabels = function (dataArr) {
  let newLabelLength = $("#stackedLabels").val().split(",").length;

  if (newLabelLength > dataArr.length) {
    dataArr.push(Object.create(dataPoint));
  }

  let index = 0;
  for (let label of dataArr) {
    let newLabel = $("#stackedLabels").val().split(",")[index];
    label["label"] = newLabel;

    index++;
  }
};

// title color btn
$(".stackedTitleColorBtn").on("click", function () {
  $("#stacked-title").css("color", $("#stackedTitleColor").val());
});

// lower bar color
$(".lowerBarBtn").on("click", function () {
  $(".lowerBar").css("background", $("#lowerBarColor").val());
});
// upper bar color
$(".upperBarBtn").on("click", function () {
  $(".upperBar").css("background", $("#upperBarColor").val());
});

$(".stackedTitleBtn").on("click", function () {
  $("#stacked-title").text($("#stackedTitleVal").val());
});

// remove title
$("#stackedCheckbox").change(function () {
  if (this.checked) {
    $("#stacked-title").text("");
  } else {
    $("#stacked-title").text("Stacked Bar Chart");
  }
});
