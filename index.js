// const domObjects = {
//   title: ".title",
//   chart: ".chart",
// };

// $(function () {
//   // const buildChart = (chartName) => {
//   //   $("body").append(`<div id=${chartName}barChart></div>`);
//   //   $(`#${chartName}barChart`).append(
//   //     `
//   //       <div class="title">
//   //         <div id="titleText" style="display: none">
//   //           <p id="titleString"></p>
//   //         </div>
//   //       </div>
//   //       `
//   //   );
//   // };
//   // // buildChart("Test");
// });

const createBarChart = (data, options, element) => {
  $(element).add(data.toString());

  let numOfBars = data.length;
  let maxValue = Math.max(...data);
  console.log(maxValue);

  for (let i = 0; i < numOfBars; i++) {
    let containerPx = $("#barChart").height();
    console.log("container height: " + containerPx);
    let maxBarHeight =
      (Math.floor($("#barChart").height()) * (maxValue * 0.9)) / 100;
    console.log("maxBarHeight: " + maxBarHeight);

    let barHeightRelToMax = Math.floor((maxBarHeight * data[i]) / 100);
    console.log("barHeightRelToMax: " + barHeightRelToMax);

    $(".xAxisContainer").append(
      `
      <div class='bar' id='${data[i]}' value='${data[i]}' style='height: ${barHeightRelToMax}px;'>${data[i]}</div>
      `
    );
  }
};
let testData = [5, 10, 15, 75, 20, 50, 99];
let testOptions = {
  width: "80%",
  height: "400px",
  title: "Bar Chart Title",
  titleFontSize: "2em",
  titleColour: "black",
  valuePosition: "middle",
  barSpacing: "80%",
  stacked: false,
};
let testElement = "#barChart";

createBarChart(testData, testOptions, testElement);
