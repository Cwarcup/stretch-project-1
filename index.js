let testData = [10, 20, 30];
let testOptions = {
  title: "Test Bar Chart",
  barColor: "#344feb",
  labels: ["One", "Two", "three"],
  width: "15",
  // height: "400px",
  titleFontSize: "1.5em",
  titleColor: "black",
  // valuePosition: "middle",
  // barSpacing: "80%",
  // stacked: false,
  // barColor: "red",
};
let testElement = "#barChart";

const createBarChart = (data, options, element) => {
  const { title, barColor, labels, width, titleColor, titleFontSize } = options;

  // add bars to xAxisContainer
  $(element).add(data.toString());
  let maxValue = Math.max(...data);
  let numOfBars = data.length;
  for (let i = 0; i < numOfBars; i++) {
    let containerPx = $("#barChart").height();
    let maxBarHeight = Math.floor($("#barChart").height()) * 0.85;
    let factor = maxBarHeight / maxValue;
    // x axis
    $(".xAxisContainer").append(
      `
      <div class='bar' id='${data[i]}' value='${data[i]}' 
      style='height: ${
        factor * data[i]
      }px; background: ${barColor}; width:${width}%'>

        <div class='bar-label' style='top: ${
          factor * data[i]
        }px; text-align: center; '>${labels[i]}</div>
      </div>
      `
    );

    // y axis
    $(".yAxisContainer").append(
      `
      <div class='y-axis-values' style='bottom: ${16 + factor * data[i]}px '>
      ${data[i]}
      </div>
      `
    );
  }

  // set title
  $(".title").text(title);
  $(".title").css("color", `${titleColor}`);
  $(".title").css("font-size", `${titleFontSize}`);

  // end of initial setup
};

// update title
$(".changeBtn").on("click", function () {
  $(".title").text($("#titleChange").val());
  $("#titleChange").val("");
});

// change labels on checked
$("input[type=checkbox]").change(function () {
  if (this.checked) {
    $(".bar-label").attr("contenteditable", "true");
  } else {
    $(".bar-label").attr("contenteditable", "false");
  }
});

// setting bar colours
let color;
$("#colorPicker").on("click", function () {
  color = $("#colorPicker").val();
});

$(".setColor").on("click", function () {
  $(".bar").css("background", color);
});

// silly hidden delay when hovering over title
let delay = 5000,
  setTimeoutConst;
$(".title").hover(
  function () {
    setTimeoutConst = setTimeout(function () {
      $(".title").text("🚀");
    }, delay);
  },
  function () {
    clearTimeout(setTimeoutConst);
  }
);

// remove title
$("input[type=checkbox]").change(function () {
  if (this.checked) {
    $(".title").attr("hidden", "true");
  } else {
    $(".title").removeAttr("hidden");
  }
});

$(".addValueBtn").on("click", function () {
  testData.push($("#addValue").val());
});

// initial setup with test data
createBarChart(testData, testOptions, testElement);

// reset graphs on click
$(".removeAll").on("click", function () {
  $(".yAxisContainer").empty();
  $(".xAxisContainer").empty();

  let newOptions = {
    title: $("#titleChange").val(),
    barColor: $("#colorPicker").val(),
    labels: $("#newLabel").val().split(","),
    width: $("#barWidth").val(),
    titleFontSize: $("#titleFontSize").val(),
    titleColor: $("#titleColor").val(),
    // barSpacing: "80%",
    // stacked: false,
  };

  let element = "#barChart";
  let newData = $("#newData")
    .val()
    .split(",")
    .map(function (item) {
      return parseInt(item, 10);
    });
  console.log(newData);
  console.log(newOptions);

  createBarChart(newData, newOptions, element);
});

let dropdownPresent = false;
$(".options").hide();

$(".showOptions").on("click", function () {
  if (!dropdownPresent) {
    $(".options").fadeIn();
    dropdownPresent = true;
  } else {
    $(".options").fadeOut();
  }
});
