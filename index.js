const createBarChart = (data, options, element) => {
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
      <div class='bar' id='${data[i]}' value='${data[i]}' style='height: ${
        factor * data[i]
      }px;'>
        <div class='bar-label' style='top: ${
          factor * data[i]
        }px; text-align: center '>${data[i]}</div>
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
let delay = 1000,
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

let testData = [2, 8, 7, 10, 15];
let testOptions = {
  width: "80%",
  height: "400px",
  title: "Bar Chart Title",
  titleFontSize: "2em",
  titleColour: "black",
  valuePosition: "middle",
  barSpacing: "80%",
  stacked: false,
  barColor: "red",
};
let testElement = "#barChart";

createBarChart(testData, testOptions, testElement);
