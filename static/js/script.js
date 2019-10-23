console.log("testing script");
var timePlaceholderText = "(Select a location above)";

$(function(){
    $('#routesId').change(function(){
        console.log("routeid reached");
        $("#timeId").text(timePlaceholderText);
        $('#stopsId').empty();
        addPlaceholder($('#stopsId'), 'Select Bus Stop');
        var route = $("#routesId option:selected").val();
        requestDirections(route);
    })
    $('#directionId').change(function(){
        console.log("directionId reached");
        $("#timeId").text(timePlaceholderText);
        var route = $("#routesId option:selected").val();
        var direction = $("#directionId option:selected").val();
        requestStops(route, direction);
    })
    $('#stopsId').change(function(){
        console.log("stopsId reached");
        var route = $("#routesId option:selected").val();
        var direction = $("#directionId option:selected").val();
        var stop = $("#stopsId option:selected").val();
        requestTime(route, direction, stop);
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
            addPlaceholder($('#directionId'), 'Select Direction');
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
            addPlaceholder($('#stopsId'), 'Select Bus Stop');
            for (var i = 0; i < stops.length; i++){
                $('#stopsId').append('<option value="' + stops[i].Value + '">' + stops[i].Text + '</option>');
            }
        }
    })
};


function requestTime(route, direction, stop){
    $.ajax({
        method:"GET",
        url: "/time",
        data: {'routeNum' : route, 'direction' : direction, 'stopNum' : stop },
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        success: function(timeObj){
            $('#timeId').empty();
            var timeString = "";
            try {
                // TODO figure out more elegant strategy
                var arrivalTime = parseInt(timeObj[0].DepartureTime.slice(6, -7));
                var timeLeft = arrivalTime - new Date().getTime();
                console.log(arrivalTime);
                console.log(new Date().getTime());
                console.log('remaining time:');
                console.log(timeLeft);
                console.log(timeLeft/1000/60) // minutes

                timeLeft = parseInt(timeLeft/1000/60);


                if (timeLeft < 60) {
                    timeString = timeLeft + " minutes";
                } else if (timeLeft > 60) {
                    var hours = parseInt(timeLeft/60);
                    var mins = timeLeft%60;
                    timeString = hours + " hours " + mins + " minutes";
                } else {
                    timeString = "Last bus has already departed";
                }
            } catch(e){
                timeString = "No Arrival times were found";
            }
//            if (timeObj[0].DepartureTime === undefined) {
//
//            } else {
//                console.log(timeObj);
    //            console.log(timeLeft[0].DepartureTime);
    //            console.log(typeof(timeLeft[0].DepartureTime));

                // TODO Uncaught TypeError: Cannot read property of undefined

//            }
            $('#timeId').text(timeString);
        }
    })
};


function addPlaceholder(element, message){
    element.append('<option label="' + message + '" disabled class="optPlaceholder"></option>');
}