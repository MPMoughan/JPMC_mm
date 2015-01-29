JPMC ATM / Branch Locator
By: Matthew Moughan

This is a simple Branch / ATM locator for Chase Bank.
- Built with Node.js in order to create a javascript server, as Chrome would not read a local file requesting location coordinates with the Geplocation API
- It queries Chase's API for locations based on latitude and longitude coordinates
- The coordinates are based upon Geolocation API

Process:
- First: Got geolocation API working
- Second: AJAX call to Chase for location information working and appended to HTML page
- Third: Took successful return of data and looped through data object, and created a new object to hand to Google Maps (originally console logged)
- Fourth: Google Maps API working
- Fifth: Markers of locations placed on Map
- Sixth: Info windows populating with particular branch information

Functionality:
- AJAX call to Chase to get close ATM/Branch locations based on location
- Incorporated Google Maps API
- Locate ATM Branches as markers on Google Map
- Google Map infowindow for the pins including pertinent information about the branch

If I had more time, I would have:
- Tested in more browsers (works in Chrome and FireFox)
- General UI updates (i.e. close one info window when you click on another marker) and improve overall look (add more information)
- Separation of concerns with Javascript and CSS files
- Handle errors better