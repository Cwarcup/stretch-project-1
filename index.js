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
  // add yAxis scale
  let maxYValue = Math.ceil(Math.max(...data) / 10) * 10;
  console.log(maxYValue);

  // add bars to xAxisContainer
  $(element).add(data.toString());
  let maxValue = Math.max(...data);
  console.log();
  let numOfBars = data.length;
  for (let i = 0; i < numOfBars; i++) {
    let containerPx = $("#barChart").height();
    console.log("container height: " + containerPx);
    let maxBarHeight = Math.floor($("#barChart").height()) * 0.85;
    console.log("maxBarHeight: " + maxBarHeight);

    let factor = maxBarHeight / maxValue;

    $(".xAxisContainer").append(
      `
      
      <div class='bar' id='${data[i]}' value='${data[i]}' style='height: ${
        factor * data[i]
      }px;'>${data[i]}</div>
      `
    );
  }
};

let testData = [5, 10, 20, 13, 28];
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
