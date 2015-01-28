JPMC ATM / Branch Locator
By: Matthew Moughan

This is a simple Branch / ATM locator for Chase Bank.
- Built with Node.js in order to create a javascript server, as Chrome would not read a local file requesting location coordinates
- It queries Chase's API for locations based on latitude and longitude coordinates
- The coordinates are

As of 5pm 1/27/2015:
- AJAX call is successful for latest version of Chrome
- Location "labels" or name of branches are appended to HTML file / view
- Incorporate Google Maps API
- Locate ATM Branches as markers on Google Map

To finish:
- Testing in other web browsers
- General UI updates and make it look pretty
- Separation of concerns - Javascript and CSS files