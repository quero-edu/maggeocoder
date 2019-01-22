/*jshint browser: true*/
/*jshint devel: true */
/*jshint esversion: 6 */
/*jshint sub:true*/

const API_KEY = "***REMOVED***";
const LANGUAGE = "pt-BR";
const REGION = "BR";
const BASE = "https://maps.googleapis.com/maps/api/geocode/json?";

function httpGet(url) {
    "use strict";
    
    var a = ";";
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    
    return xmlHttp.responseText;
}

function geocode() {
    "use strict";
    
    const address_text = document.getElementById("addresses_box").value;
    const address_array = address_text.split("\n");
    document.getElementById("progress_bar").value = 0;
    document.getElementById("progress_bar").max = address_array.length;
    
    let results_text = "Original\tEstado\tCidade\tEndereço\tComplemento\tBairro\tCEP\tLat\tLon\n";
    
    address_array.forEach(function (address) {
        const request_address = `${BASE}address=${address}&region=${REGION}&language=${LANGUAGE}&key=${API_KEY}`;
        results_text += request_address + "\n";
        const request_json = JSON.parse(httpGet(request_address));
        results_text += request_json["status"];
        document.getElementById("progress_bar").value += 1;
    });
    alert(results_text);
    document.getElementById("results_box").value = results_text;
    document.getElementById("progress_bar").value = 100;
}

function reverse_geocode() {
    "use strict";
    alert("R_Geo!");
}