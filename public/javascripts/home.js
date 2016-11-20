d3.select(".middle").style("border-radius", "6px")

//Eventually, this needs to be an variable from request/cookie
var user = "James"
var url = "/polls/user/" + user

//Get polls of a user and display them in user-polls

$.getJSON(url, function(data){
console.log(data)
var doc = data

drawBox(data, '#user-polls')



})

