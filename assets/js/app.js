// @TODO: YOUR CODE HERE!

// Path of dataset
var dataset_path = 'assets/data/data.csv';
//console.log(analysis)

// ========================= DEFINE SVG CHART DIMENSIONS =========================
// ===============================================================================
// Set margin for the layout
var margin = {
    top: 20,
    right: 40,
    bottom: 110,
    left: 100
  };

// Define svg area dimensions
var svgWidth = 960;
var svgHeight = 550;

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// ========================= SELECT HTML PLACE TO APPEND THE SVG G =========================
// ==========================================================================================
// Create SVG wrapper and group.
var svg = d3.select('#scatter')
            .append('svg')
            .attr('height', svgHeight)
            .attr('width', svgWidth);

    
var chartGroup = svg.append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`);

/*
var chartGroup = svg.selectAll('g')
.data(dataset_path)
.enter()
.append('g')
.attr('transform', `translate(${margin.left}, ${margin.top})`);
*/

// ******************* @BONUS: INITIAL PARAMETERS *******************
// ******************************************************************
var chosenXAxis = "age";
var chosenYAxis = "smokes";

// ******************* @BONUS: FUNCTIONS TO UPDATE CHART *******************
// *************************************************************************
// Updates x-scale var upon click on axis label: 
function xScale(metroData, chosenXAxis) {  
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(metroData, d => d[chosenXAxis]) * 0.8, d3.max(metroData, d => d[chosenXAxis]) * 1.2])
    .range([0, chartWidth]);    

  return xLinearScale;
} // END Updates: x-scale 

// Updates y-scale var upon click on axis label 
function yScale(metroData, chosenYAxis) {  
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(metroData, d => d[chosenYAxis]) * 0.8, d3.max(metroData, d => d[chosenYAxis]) * 1.2])
    .range([chartHeight, 0]);    

  return yLinearScale;
} // END Updates: x-scale 

// Updates xAxis var upon click on axis label
function renderXAxis(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);
  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);
  return xAxis;
} // END: Updates xAxis var upon click on axis label 

// Updates yAxis var upon click on axis label
function renderYAxis(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);
  yAxis.transition()
    .duration(1000)
    .call(leftAxis);
  return yAxis;
} // END: Updates yAxis var upon click on axis label 

// Updates Circles at xAxis
function renderXCircles(circlesGroup, newXScale, chosenXAxis, textCircles) {
  circlesGroup.transition()
    .duration(1000)
    .attr('cx', d => newXScale(d[chosenXAxis]));

    textCircles.transition()
    .duration(1000)
    .attr('x', d => newXScale(d[chosenXAxis]));

  return [circlesGroup, textCircles];
} // END: Updates Circles at XAxis

// Updates Circles at yAxis
function renderYCircles(circlesGroup, newYScale, chosenYAxis, textCircles) {
  circlesGroup.transition()
    .duration(1000)
    .attr('cy', d => newYScale(d[chosenYAxis]));

  textCircles.transition()
    .duration(1000)
    .attr('y', d => newYScale(d[chosenYAxis]));

  return [circlesGroup, textCircles];
} // END: Updates Circles at yAxis

// Updates circles group with new tooltip
function updateTooltip(chosenXAxis, chosenYAxis, circlesGroup) {
  // Get the values according to chosen axes.
  // for X Axis  
  if (chosenXAxis === "age") {
    var xlabel = "Age";
  } else if (chosenXAxis === "poverty") {
    var xlabel = "Poverty (%)";
  } else {
    var xlabel = "House Income (%)";
  }

  // for Y Axis
  if (chosenYAxis === "smokes") {
    var ylabel = "Smokes (%):";
  } else if (chosenYAxis === "obesity") {
    var ylabel = "Obesity (%)";
  } else {
    var ylabel = "Healthcare (%)";
  }

  // Initialize tool tip to FUNCTION
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>${xlabel}: ${d[chosenXAxis]}<br>${ylabel}: ${d[chosenYAxis]}`);
    });
  // Create tooltip in the chart    
  circlesGroup.call(toolTip);

  // Event listeners to display and hide the tooltip
  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data, this);
   })
   // onmouseout events
   .on("mouseout", function(data, index) {
     toolTip.hide(data);
   });
  
  //var graphAnalysis 
  var graphAnalysis = updateTextAnalisis(chosenXAxis, chosenYAxis);
  //console.log(graphAnalysis[0]);
  //console.log(graphAnalysis[1]);

  d3.select('.article > h2').text(graphAnalysis[0]);
  d3.select('.article > p').text(graphAnalysis[1]);

   return circlesGroup;
} // END: Updates circles group with new tooltip

function updateTextAnalisis(chosenXAxis, chosenYAxis) {
  var headerAnalysis = '';
  var textAnalysis = '';

  if (chosenXAxis === 'age' && chosenYAxis === 'smokes') {
    headerAnalysis = analysis[0].header;
    textAnalysis = analysis[0].text_analysis; 
  } else if (chosenXAxis === 'age' && chosenYAxis === 'obesity') {
    headerAnalysis = analysis[1].header;
    textAnalysis = analysis[1].text_analysis;     
  } else if (chosenXAxis === 'age' && chosenYAxis === 'healthcare') {
    headerAnalysis = analysis[2].header;
    textAnalysis = analysis[2].text_analysis;     
  } else if (chosenXAxis === 'poverty' && chosenYAxis === 'smokes') {
    headerAnalysis = analysis[3].header;
    textAnalysis = analysis[3].text_analysis;     
  } else if (chosenXAxis === 'poverty' && chosenYAxis === 'obesity') {
    headerAnalysis = analysis[4].header;
    textAnalysis = analysis[4].text_analysis;     
  } else if (chosenXAxis === 'poverty' && chosenYAxis === 'healthcare') {
    headerAnalysis = analysis[5].header;
    textAnalysis = analysis[5].text_analysis;     
  } else if (chosenXAxis === 'income' && chosenYAxis === 'smokes') {
    headerAnalysis = analysis[6].header;
    textAnalysis = analysis[6].text_analysis;     
  } else if (chosenXAxis === 'income' && chosenYAxis === 'obesity') {
    headerAnalysis = analysis[7].header;
    textAnalysis = analysis[7].text_analysis;     
  } else if (chosenXAxis === 'income' && chosenYAxis === 'healthcare') {
    headerAnalysis = analysis[8].header;
    textAnalysis = analysis[8].text_analysis;     
  }
  //console.log(headerAnalysis);
  //console.log(textAnalysis);
  return [headerAnalysis, textAnalysis];
}

// ========================= LOAD DATA AND CREATE SCATTER PLOTS =========================
// ======================================================================================
// Retrieve data from the CSV file and execute.
d3.csv(dataset_path).then(function(metroData) {
  
  // Parse data as integer
  metroData.forEach((metro) => {
    metro.abbr = metro.abbr;    
    metro.age = +metro.age;
    metro.smokes = +metro.smokes;
    metro.poverty = +metro.poverty;
    metro.healthcare = +metro.healthcare;
    metro.obesity = +metro.obesity;
    metro.income = +metro.income;
  });

  // Create scale functions
  // ==============================
  // ******************* @BONUS: Scale functions above csv import *******************
  var xLinearScale = xScale(metroData, chosenXAxis);
  var yLinearScale = yScale(metroData, chosenYAxis);
      
  // Create axis functions ======================================================== OK
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Append Axes to the chart
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .attr('class', 'axisWhite')
    .call(bottomAxis);

  var yAxis = chartGroup.append("g")
    .attr('class', 'axisWhite')
    .call(leftAxis);
  // ============================================================================== OK

  // ============================== Append Initial Create Circles ==============================
  // =========================================================================================== OK   
  var circlesGroup = chartGroup.selectAll("circle")
    .data(metroData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis])) 
    .attr("cy", d => yLinearScale(d[chosenYAxis])) 
    .attr("r", 10)
    .attr('stroke', 'white')
    .attr("fill", "#f95d6a") // COLOR
    .attr("opacity", ".5");
    
  var textCircles = chartGroup.append('text')
    .selectAll('tspan')
    .data(metroData)
    .enter()
    .append('tspan')
    .classed('stateText', true)
    .attr('x', d => xLinearScale(d[chosenXAxis]))
    .attr('y', d => yLinearScale(d[chosenYAxis]))
    .text(d => d.abbr);



  // ******************* @BONUS: SET MULTIPLE AXES LABES *******************
  // *******************************************************************
  // Create group for  2 x- axis labels
  var xlabelsGroup = chartGroup.append("g")
                              .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);
  var ylabelsGroup = chartGroup.append("g")
                              .attr("transform", `translate(${chartWidth / + 60}, ${chartHeight / 6})`);

  // X-AXES
  var ageLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "age") // value to grab for event listener
    .classed("active", true)    
    .text("Age (Median)");

  var povertyLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "poverty") // value to grab for event listener
    .classed("inactive", true)
    .text("Poverty");

  var incomeLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive", true)
    .text("House Income (Median)");
  
  // Y-AXES
  var smokesLabel = ylabelsGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (chartHeight / 3))
    .attr('value', 'smokes')  
    .classed("active", true)
    .text("Smokes(%)");
  
  var obeseLabel = ylabelsGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 20)
    .attr("x", 0 - (chartHeight / 3))
    .attr("value", "obesity") 
    .classed("inactive", true)
    .text("Obsese (%)");

  var healthcareLabel = ylabelsGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (chartHeight / 3))
    .attr("value", "healthcare") 
    .classed("inactive", true)
    .text("Health (%)");
  
  // Update tooltip function above csv import
  var circlesGroup = updateTooltip(chosenXAxis, chosenYAxis, circlesGroup); // Needs definition.
  
  // **************************** @BONUS: EVENTLSITENER FOR LABELS ****************************
  // EventListener for X-Axis labels
  xlabelsGroup.selectAll('text').on('click', function () {
    // get value of selection label
    var xValue = d3.select(this).attr("value");

    if (xValue !== chosenXAxis) {
      // replaces chosenXAxis with xValue
      chosenXAxis = xValue;
      console.log(chosenXAxis);

      // Update X Scale -------------------------------------FROM HERE
      xLinearScale = xScale(metroData, chosenXAxis);
      // Updates x axis with transition
      xAxis = renderXAxis(xLinearScale, xAxis);

      
      // Updates circles with new x values
      var groupofcircles = renderXCircles(circlesGroup, xLinearScale, chosenXAxis, textCircles);

      // Updates tooltips with new info
      circlesGroup = updateTooltip(chosenXAxis, chosenYAxis, circlesGroup);

      // Changes classes to change bold text. SHOW ACTIVES
      if (chosenXAxis === 'age') {
        ageLabel          
          .classed("active", true)
          .classed("inactive", false);
        povertyLabel
          .classed("active", false)
          .classed("inactive", true);
        incomeLabel
          .classed("active", false)
          .classed("inactive", true);          
      } else if (chosenXAxis === 'poverty') {
        ageLabel          
          .classed("active", false)
          .classed("inactive", true);
        povertyLabel
          .classed("active", true)
          .classed("inactive", false);
        incomeLabel
          .classed("active", false)
          .classed("inactive", true); 
      } else if (chosenXAxis === 'income'){
        ageLabel          
          .classed("active", false)
          .classed("inactive", true);
        povertyLabel
          .classed("active", false)
          .classed("inactive", true);
        incomeLabel
          .classed("active", true)
          .classed("inactive", false); 
      } // END: set active label
    } // END: set active axis value selection
  }); // END eventListener for X-Axis labels


  // EventListener for Y-Axis labels
  ylabelsGroup.selectAll('text').on('click', function () {
    // get value of selection label
    var yValue = d3.select(this).attr("value");

    if (yValue !== chosenYAxis) {
      // replaces chosenYAxis with yValue
      chosenYAxis = yValue;
      
      // Update X Scale -------------------------------------FROM HERE
      yLinearScale = yScale(metroData, chosenYAxis);
      // Updates x axis with transition
      yAxis = renderYAxis(yLinearScale, yAxis);

      // Updates circles with new x values
      var groupofcircles = renderYCircles(circlesGroup, yLinearScale, chosenYAxis, textCircles);

      // Updates tooltips with new info
      circlesGroup = updateTooltip(chosenXAxis, chosenYAxis, circlesGroup);

      // Changes classes to change bold text. SHOW ACTIVES
      if (chosenYAxis === 'smokes') {
        smokesLabel          
          .classed("active", true)
          .classed("inactive", false);
        obeseLabel
          .classed("active", false)
          .classed("inactive", true);
        healthcareLabel
          .classed("active", false)
          .classed("inactive", true);
      } else if (chosenYAxis === 'obesity') {
        smokesLabel          
          .classed("active", false)
          .classed("inactive", true);
        obeseLabel
          .classed("active", true)
          .classed("inactive", false);
        healthcareLabel
          .classed("active", false)
          .classed("inactive", true);
      } else {
        smokesLabel          
          .classed("active", false)
          .classed("inactive", true);
        obeseLabel
          .classed("active", false)
          .classed("inactive", true);
        healthcareLabel
          .classed("active", true)
          .classed("inactive", false);
      } // END: set active label
    }  // END: set active axis value selection

  }); // END eventListener for Y-Axis labels


}); // END d3.csv(DATA)