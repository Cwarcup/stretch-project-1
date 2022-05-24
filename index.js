const drawBarChart = function (data, options, element) {
  $(element).add("div").addClass("test").text(data);
  console.log(options);
};

let options = {
  key: "value",
};

// drawBarChart([1, 2, 3, 4, 5], options, "#container-chart");

$(".inputData").on("click", function () {
  let label = $("#Label").val();
  let val = $("#Value").val();
  console.log(label);
  console.log(val);
});
