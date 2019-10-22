console.log("testing script");

$(function(){
    $('#routesId').change(function(){
        console.log("routeid reached");
        var route = $("#routesId option:selected").val();
        requestDirections(route);
    })
    $('#directionId').change(function(){
        console.log("directionId reached");
        var route = $("#routesId option:selected").val();
        var direction = $("#directionId option:selected").val();
        requestStops(route, direction);
    })
});


function requestDirections(route){
    $.ajax({
        method: "GET",
        url: "/directions",
        data: { 'routeNum' : route },
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        success: function(directions){
            $('#directionId').empty();
            for (var i = 0; i < directions.length; i++) {
                $('#directionId').append('<option value="' + directions[i].Value + '">' + directions[i].Text + '</option>');
            }
        }
        });
};


function requestStops(route, direction){
    $.ajax({
        method: "GET",
        url: "/stops",
        data: {'routeNum' : route, 'direction' : direction },
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        success: function(stops){
            $('#stopsId').empty();
            for (var i = 0; i < stops.length; i++){
                $('#stopsId').append('<option value="' + stops[i].Value + '">' + stops[i].Text + '</option>');
            }
        }
    })
};