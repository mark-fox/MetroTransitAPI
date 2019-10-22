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