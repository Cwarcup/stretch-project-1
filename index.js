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

  for (let i = 0; i < numOfBars; i++) {
    console.log("barcharty height" + $("#barChart").height());
    console.log(data[i]);
    let percentHeight =
      ($("#barChart").height() / $("#barChart").height()) * data[i];
    console.log(percentHeight);
    $(".xAxisContainer").append(
      `
      <div class='bar' id='${data[i]}' value='${data[i]}' style='height: ${percentHeight}%;'>${data[i]}</div>
      `
    );
  }
};
let testData = [5, 10, 15, 20, 50];
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
