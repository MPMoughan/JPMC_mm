// locate branch assumes it's taking in an array of objects to create the markers on the map
// to add the marker to the map, call setMap();


// locate branch assumes it's taking in an array of objects to create the markers on the map
// to add the marker to the map, call setMap();
function locateBranch (arr, map) {
  for (var i = 0; i < arr.length; i++){

    // build content that gets placed into the window with dynamic info from array

      var content = '<div id="content">'+
    '<div id="siteNotice">'+'</div>'+
    '<h3 id="firstHeading" class=firstHeading">Chase Branch & ATM Locator</h3>'+
      '<div id="bodyContent">'+
        '<p> <b>Branch Name </b>: ' + arr[i].label + '</p>' +
        '<p> <b>Address</b>: ' + arr[i].address + '</p>' +
        '<p> <b>City</b>: ' + arr[i].city + '</p>' +
        '<p> <b>State</b>: ' + arr[i].state + '</p>' +
        '<p> <b>Zip Code</b>: ' + arr[i].zip + '</p>' +
        '<p> <b>Bank</b>: ' + arr[i].bank + '</p>' +
        '<p> <b>Location Type</b>: ' + arr[i].locType + '</p>' +
        '<p> <b>Distance Away</b>: ' + arr[i].distance + '</p>' +
        '<p> <b>Phone Number</b>: ' + arr[i].phone + '</p>' +
      '</div>'+
    '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: content
    });

    // google maps lat/long object created
    var marker = new google.maps.Marker({
          position: arr[i].location,
          title: arr[i].label
    });

    // eventlistener, passing in function with, marker, content, and infowindow for specific
    // branch information

    google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
      return function() {
          infowindow.setContent(content);
          infowindow.open(map,marker);
      };
    })(marker,content,infowindow));


    marker.setMap(map)

    // original event listener for markers
    // google.maps.event.addListener(marker, 'click', function() {
    //   console.log(this);
    //   infowindow.open(map,marker);
    // });
  }
}

// getLocaiton - function with native geolocation api to find coordinates
function getLocation() {
    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback);
    }
    else {
      x.innerHTML = "We truly apologize, Geolocation is not currently not supported by this version of your browser.";
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


    // going to fill atmLocation with branch object below with ATM information
    var atmLocation = [];

    // define latitude, using geolocation .coords (built in)
    var latitude = position.coords.latitude;

    // define longitude, using geolocation .coords (built in)
    var longitude = position.coords.longitude;

    // url variable passed into AJAX call
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

                      // creation of object with pertinent information to hand to google
                      // create google map markers with "branch.location"
                      // create google map infowindow with the rest

                      // ** if given more time, I would have figured best way to loop over the array and get hours array

                      var branch = {};
                      branch.location = new google.maps.LatLng(result.locations[i].lat, result.locations[i].lng),
                      branch.state = result.locations[i].state,
                      branch.locType = result.locations[i].locType,
                      branch.label = result.locations[i].label,
                      branch.address = result.locations[i].address,
                      branch.city = result.locations[i].city,
                      branch.zip = result.locations[i].zip,
                      branch.bank = result.locations[i].bank,
                      branch.phone = result.locations[i].phone,
                      branch.distance = result.locations[i].distance;
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