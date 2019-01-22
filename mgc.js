/*jslint browser:true*/
/*jslint devel: true */
/*jslint es6 */

const API_KEY = "***REMOVED***";
const LANGUAGE = "pt-BR";
const REGION = "BR";
const BASE = "https://maps.googleapis.com/maps/api/geocode/json?";

function geocode() {
    "use strict";
    let address_text = document.getElementById("addresses_box").value;
    document.getElementById("progress_bar").value = 50;
    alert(address_text);
    let address_array = address_text.split("\n");
    let results_text = "";
    address_array.forEach(function (address) {
        let request_address = `${BASE}address=${address}&region=${REGION}&language=${LANGUAGE}&key=${API_KEY}`;
        results_text += request_address + "\n";
    });
    alert(results_text);
    document.getElementById("results_box").value = results_text;
    document.getElementById("progress_bar").value = 100;
}

function reverse_geocode() {
    "use strict";
    alert("R_Geo!");
}