let testData = [10, 20, 30];
let testOptions = {
  title: "Test Bar Chart",
  barColor: "#344feb",
  labels: ["One", "Two", "three"],
  // width: "80%",
  // height: "400px",
  // title: "Bar Chart Title",
  // titleFontSize: "2em",
  // titleColour: "black",
  // valuePosition: "middle",
  // barSpacing: "80%",
  // stacked: false,
  // barColor: "red",
};
let testElement = "#barChart";

const createBarChart = (data, options, element) => {
  const { title, barColor, labels } = options;

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
      }px; background: ${barColor}'>
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

$(".addValueBtn").on("click", function () {
  testData.push($("#addValue").val());
});

createBarChart(testData, testOptions, testElement);

// reset graphs
$(".removeAll").on("click", function () {
  $("#barChart").empty();

  let newData = $(".newData").val();
  let newLabel = $(".newLabel").val();
  let color = $("#colorPicker").val();
  let title = $("#titleChange").val();
});
