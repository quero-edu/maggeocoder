# MagGeoCoder

Static website built for easy geocoding via Google APIs and formatted output ready for Excel. Written in pure JavaScript.

## To-dos

**TODO**: Export results to CSV

**TODO**: Possibly store/cache results in browser?

**TODO**: Zoom map to perfectly fit all markers.

**TODO**: Add form of exponential decay to requests (at one instance, in a 447 address query, 8 returned with a status as OVER_QUERY_LIMIT)

**TODO**: ~~Move styling and options js out of mgc.js~~ and css into .css file

~~**TODO**: Convert \t to whitespace on user input~~ Done!

~~**TODO**: Warn users if \n entries or if subsdistricts exist~~ \n warnings no longer necessary, so this feature just for subdisctricts is kinda superfluous.

~~**TODO**: Show result pins on map from acquired lat/lons~~ Done!

~~**TODO**: Reverse Geocode~~ Done!

~~**TODO**: Order results~~ Done!

~~**TODO**: Test Maps API vs Place Geocode API~~ Removed

## Version History

* **Version 0.3**
    * Now adding geocoded locations as pins to the Google Map for double-checking results
    * Added reverse-geocoding for decimal `LAT\tLON` pairs
    * Added dark-mode (accessible by clicking the page title)
    * Results are now in the same order as they were submitted
    * Added option to remove blank lines from input
    * Removed the option to choose between the Maps JS API and Geocode API, as both offered the same results but the JS API has harsher limits
    * Now open source! :tada:
* **Version 0.2**
    * Added a Google Map
    * Added the option of using the Maps JS API, in addition to the Geocode API
    * Changed synchronous requests for asynchronous requests
        * As a side-effect, results are no longer in their original order
* **Version 0.1**
    * First public "release"
    * Uses synchronous requests
