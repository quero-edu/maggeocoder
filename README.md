# MagGeoCoder

Static website built for easy geocoding via Google APIs and formatted output ready for Excel. Written in pure JavaScript.

## To-dos

**TODO**: Add 'clear' button to clear address textbox

**TODO**: Improve progressbar (move progress to requests)

**TODO**: Offer the option to select which address components should be shown in the results

**TODO**: Show results in table form

**TODO**: Possibly store/cache results in browser?

**TODO**: ~~Move styling and options js out of mgc.js~~ and css into .css file

~~**TODO**: Export results to CSV~~ Done!

~~**TODO**: Zoom map to perfectly fit all markers.~~ Done!

~~**TODO**: Add form of exponential decay to requests~~ Requests are sent at a fixed interval to not exceed query limits

~~**TODO**: Convert \t to whitespace on user input~~ Done!

~~**TODO**: Warn users if \n entries or if subsdistricts exist~~ \n warnings no longer necessary, so this feature just for subdistricts is kinda superfluous.

~~**TODO**: Show result pins on map from acquired lat/lons~~ Done!

~~**TODO**: Reverse Geocode~~ Done!

~~**TODO**: Order results~~ Done!

~~**TODO**: Test Maps API vs Place Geocode API~~ Removed

## Version History

* **Version 0.4**
    * Added delay in between requests to not exceed API maximum of 50 requests/second
    * Added option to remove tabs from user input (on by default)
    * Added option to export results to .csv file (thanks to @alempedroso for the suggestion!)
    * Embedded map now zooms in to marker locations
    * Moved styling logic into separate js file for better page loading experience
    * Improved access to darkmode and added link to project repository 
    * Improved styling and document semantics
    
* **Version 0.3**
    * Now open source! :tada:
    * Now adding geocoded locations as pins to the Google Map for double-checking results
    * Added reverse-geocoding for decimal `LAT\tLON` pairs
    * Added dark-mode (accessible by clicking the page title)
    * Results are now in the same order as they were submitted
    * Added option to remove blank lines from input
    * Removed the option to choose between the Maps JS API and Geocode API, as both offered the same results but the JS API has harsher limits
    
* **Version 0.2**
    * Added a Google Map
    * Added the option of using the Maps JS API, in addition to the Geocode API
    * Changed synchronous requests for asynchronous requests
        * As a side-effect, results are no longer in their original order
    
* **Version 0.1**
    * First public "release"
    * Uses synchronous requests
