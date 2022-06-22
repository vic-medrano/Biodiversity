function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();
//when an ID number is selected, print to console
  function optionChanged(newSample) {
    console.log(newSample);
  }
//Function is called from HTML doc and calls buildMetadata() and buildCharts()
  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }
//Declare the first function
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text(Object.entries(result));
    });
  }