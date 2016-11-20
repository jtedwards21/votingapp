

var drawBox = function(data, parent){


var xBarGap = 10;

var margins = {
top: 15,
bottom: 5,
left: 5,
right: 5
}

var height = 200 - margins.top - margins.bottom
var width = 200 - margins.left - margins.right



for(var i = 0; i < data.length; i++){

//Append a box to parent

var box = d3.select(parent).append('div')

box

.attr("class", "col-xs-6")

box
.append('div')
.attr("class", "poll-title text-center")
.html(data[i].title)

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

for(var j = 0; j < choiceData.length; j++){
//Draw the x axis

chart
.append('text')
.attr('y', 0)
.attr('x', j*(width/choiceData.length))
.text(choiceData[j])
.attr('text-anchor', "middle")
}

}
}
