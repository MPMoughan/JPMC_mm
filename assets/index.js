// locate branch assumes it's taking in an array of objects to create the markers on the map
// to add the marker to the map, call setMap();
function locateBranch (arr, map) {
  for (var i = 0; i < arr.length; i++){

    // google maps lat/long object created
    var marker = new google.maps.Marker({
          position: arr[i].location,
          title:"ATM Location"
    });
    marker.setMap(map);

    // build contentString that gets placed into the window

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
  }
}

function getLocation() {
    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback);
    }
    else {
        x.innerHTML = "We truly apologize, Geolocation is not currently not supported by this version of your browser. For closest ATM or Branch locations, please call: ";
    }
};

function successCallback(position) {
      var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapOptions = {
          zoom: 15,
          center: myLatlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

    // create a new map including "myOptions"
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    // marker for current position
    var marker = new google.maps.Marker({
          position: myLatlng,
          title:"Hello World!"
    });

    // going to fill atmLocation with google map lat, long with whatever is returned
    var atmLocation = [];

    // define latitude, using geolocation .coords
    var latitude = position.coords.latitude;

    // define longitude, using geolocation .coords
    var longitude = position.coords.longitude;

    var url = "https://m.chase.com/PSRWeb/location/list.action?lat=" + latitude + "&lng=" + longitude;

    // AJAX call to Chase to get the ATM locations
    $(document).ready(function(){
      $("#button1").click(function(){
        $.ajax({
          url : url,
          type : "GET",

          // success function for AJAX call
          // result = the returned object from JPMC object
          success : function(result) {
            console.log(result);
              if (result.errors.length > 0){
                alert("We're temporarily unable to complete your request. Please try again later.");
              }
              else {
              // for loop - loop over the locations array within the result object
                  if (result.locations.length == 0 ){
                    console.log("Sorry there was an error processing your request");
                    alert("Sorry there was an error processing your request");
                  }
                  else {

                    for (var i = 0; i < result["locations"].length; i++) {

                      // google maps object
                      var branch = new google.maps.LatLng(result.locations[i].lat, result.locations[i].lng);
                        atmLocation.push(branch);
                    }
                    console.log(atmLocation);
                    locateBranch(atmLocation, map);
                  }
              }
          },
          error : function() {
            alert("operation did not work")
          }
        });
      });
    });
}