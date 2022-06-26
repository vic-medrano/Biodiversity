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
//Intialize the dashboard

init();
//when an ID number is selected, print to console
  function optionChanged(newSample) {
    console.log(newSample);
  }
//Function is called from HTML doc and calls buildMetadata() and buildCharts()
  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  
// Demographics Panel 
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var filterMetadata = resultArray[0];
      
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");

      // Use `.html("") to clear any existing metadata
      PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(filterMetadata).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}
 }
// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    var metadata = data.metadata
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var filterMetadata = resultArray[0];
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filteredSample = samples.filter(samplesObj => samplesObj.id == sample)[0];
    console.log(sample);
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = filteredSample.otu_ids
    var otu_labels = filteredSample.otu_labels
    var sample_values = filteredSample.sample_values

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    //var stringIds = otu_ids.map(string => parseInt(string.otu_ids));

    var yticks = otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse();
    var xticks = sample_values.slice(0, 10).reverse();
    var otu_labels = otu_labels.slice(0, 10).reverse();
    console.log(otu_ids);

    // 8. Create the trace for the bar chart. 
    var trace = {
      x: xticks,
      y: yticks,
      type: 'bar', 
      text: otu_labels,
      orientation: "h",
    };

    var barData = [trace]; 
    console.log(barData);
    console.log(xticks);
    console.log(yticks);

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      yaxis: {title:"OTU ID #"},
      xaxis: {title: "Bacteria Sample Values"}
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar', barData, barLayout);

      // Bar and Bubble charts
    // 1. Create the trace for the bubble chart.
    var bubbleData =[{
      x: xticks,
      y: yticks,
      type: 'bubble',
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale:'Y1GnBu',
      }
    }]; 

    
    

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title:'Bacteria Cultures Per Sample',
      xaxis: {title: "OTU IDs"},
      yaxis: {title: "Sample Values"},
      showlegend: false,
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    //GAUGE Chart
    // 3. Create a variable that holds the washing frequency.
   var wfreq = filterMetadata.wfreq
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq, 
        title: {text:"Belly Button Washing Frequency"},
        type: "indicator",
        colorscale: "Earth",
        mode: "gauge+number",
        gauge: {
          bar: {color: 'white'},
          axis: {range: [null,9]},
          steps:[
            {range: [0,2], color: '#f8b195'},
            {range: [2,4], color: '#f67280'},
            {range: [4,6], color:'#c06c84'},
            {range: [6,8], color: '#6c5b7b'},
            {range: [8,10], color:'#355c7d'},
          ]
        }
      }
    ];
     
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {width: 500, height: 400, margin: { t:0, b:0}};

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  })};
 