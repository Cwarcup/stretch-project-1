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
  // let maxYValue = Math.ceil(Math.max(...data) / 10) * 10;
  // console.log(maxYValue);
  // let [yAxisArr, percent] = [[], 0.1];
  // for (let i = 0; i < 10; i++) {
  //   let newVal = Math.ceil(maxYValue * percent);
  //   yAxisArr.push(newVal);
  //   percent += 0.1;
  // }

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

  // change bar color when clicked

  // update options
  $(".changeBtn").on("click", function () {
    $(".title").text($("#titleChange").val());
    $("#titleChange").val("");
  });

  // change box colours
  // $(".bar").css("background", $("#colorPicker").val());
  $("#colorPicker").ColorPicker({
    onChange: function () {
      $(".bar").css("background", $(this.value));
    },
  });

  // change labels on checked
  $("input[type=checkbox]").change(function () {
    if (this.checked) {
      $(".bar-label").attr("contenteditable", "true");
      console.log("yes");
    } else {
      $(".bar-label").attr("contenteditable", "false");
    }
  });
};

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
