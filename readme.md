JPMC ATM / Branch Locator
By: Matthew Moughan

This is a simple Branch / ATM locator for Chase Bank.
- Built with Node.js in order to create a javascript server, as Chrome would not read a local file requesting location coordinates
- It queries Chase's API for locations based on latitude and longitude coordinates
- The coordinates are

As of EOD 1/26/15:
- AJAX call is successful for latest version of Chrome
- Location "labels" or name of branches are appended to HTML file / view

To finish:
- Testing in other web browsers
- Incoporate Google Maps API in order to geo-locate locations on embedded map
- General UI updates and make it look pretty
- Separation of concerns