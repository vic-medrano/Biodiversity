console.log(cityGrowths);

var sortedCities = cityGrowths.sort((a,b) =>
a.population - b.population).reverse(); 

var topFiveCities = sortedCities.slice(0,7);

var topSevenCityNames = topFiveCities.map(city => city.City);
var topSevenCityGrowths = cityGrowths.map(city => parseInt(city.population));
var trace = {
    x: topSevenCityNames,
    y: topSevenCityGrowths,
    type: "bar"
  };
  var data = [trace];
  var layout = {
    title: "Largest Populated Cities",
    xaxis: {title: "City" },
    yaxis: {title: "Population"}
  };
  Plotly.newPlot("bar-plot", data, layout);