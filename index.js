let testData = [10, 20, 30, 40];
let testOptions = {
  title: "Test Bar Chart",
  barColor: "#354259",
  labels: ["One", "Two", "three"],
  // width: "15",
  // height: "400px",
  titleFontSize: "1.5em",
  titleColor: "#354259",
  // valuePosition: "middle",
  // barSpacing: "80%",
  // stacked: false,
  // barColor: "red",
};
let testElement = "#grid-chart";

const createBarChart = (data, options, element) => {
  const { title, barColor, labels } = options;
  let numOfBars = data.length;
  let maxValue = Math.max(...data);

  // create rows and cols for grid

  $("#grid-chart").css({
    "grid-template-rows": `repeat(${maxValue}, auto) 20px`,
    "grid-template-columns": `50px repeat(${numOfBars}, auto`,
  });

  // add bars to xAxisContainer
  console.log(numOfBars);

  let colStart = 2;
  let colEnd = 3;
  for (let i = 0; i < numOfBars; i++) {
    $(".bars-container").append(
      `
      <div class='single-bar' id='${data[i]}' value='${data[i]}' style='background: ${barColor}; grid-column: ${colStart} / ${colEnd}; grid-row: '></div>
      `
    );
    colStart++;
    colEnd++;
  }

  // set title
  $(".grid-title").text(title);
  $(".grid-title").css("color", `${testOptions.titleColor}`);
  $(".grid-title").css("font-size", `${testOptions.titleFontSize}`);

  // end of initial setup
};

// // update title
// $(".changeBtn").on("click", function () {
//   $(".title").text($("#titleChange").val());
//   $("#titleChange").val("");
// });

// // change labels on checked
// $("input[type=checkbox]").change(function () {
//   if (this.checked) {
//     $(".bar-label").attr("contenteditable", "true");
//   } else {
//     $(".bar-label").attr("contenteditable", "false");
//   }
// });

// // setting bar colours
// let color;
// $("#colorPicker").on("click", function () {
//   color = $("#colorPicker").val();
// });

// $(".setColor").on("click", function () {
//   $(".bar").css("background", color);
// });

// // silly hidden delay when hovering over title
// let delay = 5000,
//   setTimeoutConst;
// $(".title").hover(
//   function () {
//     setTimeoutConst = setTimeout(function () {
//       $(".title").text("🚀");
//     }, delay);
//   },
//   function () {
//     clearTimeout(setTimeoutConst);
//   }
// );

// remove title
// $("input[type=checkbox]").change(function () {
//   if (this.checked) {
//     $(".title").attr("hidden", "true");
//   } else {
//     $(".title").removeAttr("hidden");
//   }
// });

// $(".addValueBtn").on("click", function () {
//   testData.push($("#addValue").val());
// });

// initial setup with test data
createBarChart(testData, testOptions, testElement);

// // reset graphs on click
// $(".removeAll").on("click", function () {

//   $(".yAxisContainer").empty();
//   $(".xAxisContainer").empty();

//   let newOptions = {
//     title: $("#titleChange").val(),
//     barColor: $("#colorPicker").val(),
//     labels: $("#newLabel").val().split(","),
//     width: $("#barWidth").val(),
//     titleFontSize: $("#titleFontSize").val(),
//     titleColor: $("#titleColor").val(),
//   };

//   let element = "#barChart";
//   let newData = $("#newData")
//     .val()
//     .split(",")
//     .map(function (item) {
//       return parseInt(item, 10);
//     });
//   console.log(newData);
//   console.log(newOptions);

//   createBarChart(newData, newOptions, element);
// });

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
