//After testing this I should try to connect it to the json data from the server.

//d3 to turn several polls into bar graphs

document.addEventListener('DOMContentLoaded', function() {


for(var i = 0; i < data.length; i++){

//Append a box to container

//Append a box for these

var box = d3.select(".chart-container")
.append('div')
.attr("class", "box")

box
.append('div')
.attr("class", "poll-title")
.html(data[i].title)

box
.append('div')
.attr("class", "poll-author")
.html(data[i].author)

var chart = box
.append('svg')


//Change dimensions
chart.attr("class", "chart")
chart.attr("height", height + margins.top + margins.bottom)
chart.attr("width", width + margins.left + margins.right)


//Set min and max for Votes
var votesData = data[i].choices.map(function(d){
return d.votes
})
var choiceData = data[i].choices.map(function(d){
return d.choice
})
var maxVotes = d3.max(votesData)

var barWidth = width/choiceData.length

var yScale = d3.scaleLinear().domain([0, maxVotes]).range([0, height])

//Get Display for X axis
var yAxis = d3.axisRight().scale(yScale).tickSize(0)


//Fix inner section and write margins
chart
.append('g')
.attr("class", "containerG")
.attr("transform", "translate(" + margins.left + "," + margins.top + ")")
.selectAll('rect')
.data(data[i].choices.slice())
.enter()
.append('rect')
.style("fill", "black")
.style("stroke","black")
.style("stroke-width", "1px")
.style("opacity", .5)
.attr("height", function(d){return yScale(d.votes);})
.attr("y", function(d){return height - yScale(d.votes)})
.attr("x", function(d){
var n = choiceData.indexOf(d.choice)
return n*(width/choiceData.length)
})
.attr("width", barWidth)
.attr("class", "bar")



}
}, false);

var data = [{
totalvotes: 5,
question: "HER?",
title: "A Q",
creator: "James",
choices: [{choice: "Hi", votes: 3}, {choice: "n", votes: 2}]
},
{
totalvotes: 5,
question: "HER?",
title: "A Q",
creator: "James",
choices: [{choice: "Hi", votes: 3}, {choice: "n", votes: 2}]
},
{
totalvotes: 5,
question: "HER?",
title: "A Qfsfd",
creator: "James",
choices: [{choice: "Hi", votes: 3}, {choice: "n", votes: 2}]
},
{
totalvotes: 5,
question: "HER?",
title: "A Q",
creator: "James",
choices: [{choice: "Hi", votes: 3}, {choice: "n", votes: 2}]
}]


var xBarGap = 10;

var margins = {
top: 5,
bottom: 5,
left: 5,
right: 5
}

var height = 200 - margins.top - margins.bottom
var width = 200 - margins.left - margins.right




