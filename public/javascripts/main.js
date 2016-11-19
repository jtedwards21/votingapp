//d3 to turn several polls into bar graphs

var data = {
totalvotes: 5,
question: "HER?",
title: "A Q",
creator: "James",
choices: [{choice: "Hi", votes: 3}, {choice: "n", votes: 2}]
}

var margins = {
top: 5,
bottom: 5,
left: 5,
right: 5
}

var height = 200 - margins.top - margins.bottom
var width = 200 - margins.left - margins.right

for(var i = 0; i < data.length; i++){

//Double Check this code

//Set min and max

d3.select(".chart-container")
.append('svg')
.attr("class", "chart")
.selectAll('rect')
.data(data[i].choices.slice())
.append('rect')



}


