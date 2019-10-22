console.log("testing script");

$(function(){
    $('#routesId').change(function(){
        console.log("routeid reached");
        var route = $("#routesId option:selected").val();
        requestDirections(route);
    })
});


function requestDirections(route){
    $.ajax({
        method: "GET",
        url: "/directions",
        data: { 'routeNum' : route },
//        contentType: 'application/json;charset=UTF-8',
        success: function(directions){
        // TODO add directions to drop down list
        }
        });
};