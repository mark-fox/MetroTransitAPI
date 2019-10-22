console.log("testing script");

$(function(){
    $('#routesId').change(function(){
        console.log("routeid reached");
        // TODO get selected object or at least value
        var route = $("#routesId option:selected").val();
        console.log("route might be: " + route);
        requestDirections(route);
    })
});


function requestDirections(route){
    console.log('route is: ' + route)
    var route2 = JSON.stringify(route);
    console.log(typeof(route2))
    $.ajax({
        method: "GET",
        url: "/directions",
        data: { 'routeNum' : route },
//        contentType: 'application/json;charset=UTF-8',
        success: function(directions){
            console.log("directions are:");
            console.log(directions);
            console.log(typeof(directions));
        }
        });
};