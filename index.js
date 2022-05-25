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
};
let testData = [5, 10, 15, 20];
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
