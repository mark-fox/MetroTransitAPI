// Global variable holding generic placeholder text
var timePlaceholderText = "(Select a location above)";

// Main function ran at start
$(function(){
    // Adds Change event to the Routes list
    $('#routesId').change(function(){
        // Replaces final result text area with placeholder text
        $("#timeId").text(timePlaceholderText);
        // Clears Bus Stops list (for additional queries)
        $('#stopsId').empty();
        // Adds title/instruction element to top of list
        addPlaceholder($('#stopsId'), 'Select Bus Stop');
        // Retrieves Value from selected element
        var route = $("#routesId option:selected").val();
        // Passes Value to function for Response
        requestDirections(route);
    })
    // Adds Change event to the Directions list
    $('#directionId').change(function(){
        // Replaces final result text area with placeholder text
        $("#timeId").text(timePlaceholderText);
        // Retrieves Values from both selected elements
        var route = $("#routesId option:selected").val();
        var direction = $("#directionId option:selected").val();
        // Passes Values to function for Response
        requestStops(route, direction);
    })
    // Adds Change event to the Bus Stops list
    $('#stopsId').change(function(){
        // Retrieves Values from all selected elements
        var route = $("#routesId option:selected").val();
        var direction = $("#directionId option:selected").val();
        var stop = $("#stopsId option:selected").val();
        // Passes Values to function for Response
        requestTime(route, direction, stop);
    })
});

// Function for submitting AJAX request for Directions
function requestDirections(route){
    $.ajax({
        method: "GET",
        url: "/directions",
        data: { 'routeNum' : route },
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        success: function(directions){
            // Clears list from any previous queries
            $('#directionId').empty();
            // Adds title/instruction element to top of list
            addPlaceholder($('#directionId'), 'Select Direction');
            // Loops through Response and creates new Option element for each result
            for (var i = 0; i < directions.length; i++) {
                $('#directionId').append('<option value="' + directions[i].Value + '">' + directions[i].Text + '</option>');
            }
        }
    });
};

// Function for submitting AJAX request for Bus Stops
function requestStops(route, direction){
    $.ajax({
        method: "GET",
        url: "/stops",
        data: {'routeNum' : route, 'direction' : direction },
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        success: function(stops){
            // Clears list from any previous queries
            $('#stopsId').empty();
            // Adds title/instruction element to top of list
            addPlaceholder($('#stopsId'), 'Select Bus Stop');
            // Loops through Response and creates new Option element for each result
            for (var i = 0; i < stops.length; i++){
                $('#stopsId').append('<option value="' + stops[i].Value + '">' + stops[i].Text + '</option>');
            }
        }
    })
};

// Function for submitting AJAX request for Departure Time
function requestTime(route, direction, stop){
    $.ajax({
        method:"GET",
        url: "/time",
        data: {'routeNum' : route, 'direction' : direction, 'stopNum' : stop },
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        success: function(timeObj){
            // Clears element from any previous results
            $('#timeId').empty();
            var timeString = "";
            // Exception handler used to catch when API returns an empty object
            try {
                // TODO figure out more elegant strategy
                // Retrieves first item's DepartureTime value, removes extra characters,
                // and converts value to integer
                var arrivalTime = parseInt(timeObj[0].DepartureTime.slice(6, -7));
                // Determines current time
                var timeLeft = arrivalTime - new Date().getTime();
                // Converts value to integer and minutes
                timeLeft = parseInt(timeLeft/1000/60);

                // Checks if next bus is less than an hour away
                if (timeLeft < 60) {
                    // Produces display string with result
                    timeString = timeLeft + " minutes";
                // Checks if next bus is over an hour away
                } else if (timeLeft > 60) {
                    // Calculates hours and minutes from value
                    var hours = parseInt(timeLeft/60);
                    var mins = timeLeft%60;
                    // Produces display string with result
                    timeString = hours + " hours " + mins + " minutes";
                } else {
                    timeString = "Last bus has already departed";
                }
            } catch(e){
                // Produces display string with error message
                timeString = "No Arrival times were found";
            }
            // Adds display string to result element
            $('#timeId').text(timeString);
        }
    })
};

// Function for add title/instruction element to passed list
function addPlaceholder(element, message){
    element.append('<option label="' + message + '" disabled class="optPlaceholder"></option>');
}