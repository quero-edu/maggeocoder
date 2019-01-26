/*jshint browser: true*/
/*jshint devel: true */
/*jshint esversion: 6 */
/*jshint sub: true*/
/*jshint strict: true */

const API_KEY = "YOURKEYHERE";
const LANGUAGE = "pt-BR";
const REGION = "BR";
const BASE = "https://maps.googleapis.com/maps/api/geocode/json?";

var map = new google.maps.Map(document.getElementById('map_div'), {
    center: {lat: -14.235004, lng: -51.92528},
    zoom: 4
});

function changeTheme() {
    "use strict";
    document.getElementById("body").style.color = "#DDD";
    document.getElementById("body").style.backgroundColor = "#333";
    const textareas = document.getElementsByTagName("textarea");
    for (let element of textareas) {
        element.style.color = "#DDD";
        element.style.backgroundColor = "#333";
    }
    document.getElementById("progress_bar").style.backgroundColor = "#333";
}

function httpGet(url) {
    "use strict";
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }

class Address {
    constructor(googleJson, apitype) {
        "use strict";
        
        try {
            this.estado = googleJson["results"][0]["address_components"].filter(el => JSON.stringify(el["types"]) === JSON.stringify(["administrative_area_level_1", "political"]))[0]["short_name"];
        }
        catch (e) {
            this.estado = "";
        }
        try {
            this.cidade = googleJson["results"][0]["address_components"].filter(el => JSON.stringify(el["types"]) === JSON.stringify(["administrative_area_level_2", "political"]))[0]["long_name"];
        }
        catch (e) {
            this.cidade = "";
        }
        try {
            this.endereco = googleJson["results"][0]["address_components"].filter(el => JSON.stringify(el["types"]) === JSON.stringify(["route"]))[0]["long_name"];
        }
        catch (e) {
            this.endereco = "";
        }
        try {
            this.endereco += ", " + googleJson["results"][0]["address_components"].filter(el => JSON.stringify(el["types"]) === JSON.stringify(["street_number"]))[0]["long_name"];
        }
        catch (e) {
            this.endereco = "";
        }
        try {
            this.complemento = googleJson["results"][0]["address_components"].filter(el => JSON.stringify(el["types"]) === JSON.stringify(["subpremise"]))[0]["long_name"];
        }
        catch (e) {
            this.complemento = "";
        }
        try {
            this.bairro = googleJson["results"][0]["address_components"].filter(el => JSON.stringify(el["types"]) === JSON.stringify(["political", "sublocality", "sublocality_level_1"]))[0]["long_name"];
        }
        catch (e) {
            this.bairro = "";
        }
        try {
            this.cep = googleJson["results"][0]["address_components"].filter(el => JSON.stringify(el["types"]) === JSON.stringify(["postal_code"]))[0]["long_name"];
        }
        catch (e) {
            this.cep = "";
        }
        try {
            if (apitype === "geoapi")
                this.lat = googleJson["results"][0]["geometry"]["location"]["lat"].toString();
            else if (apitype === "mapsapi")
                this.lat = googleJson["results"][0]["geometry"]["location"]["lat"]().toString();
        }
        catch (e) {
            this.lat = "";
        }
        try {
            if (apitype === "geoapi")
                this.lon = googleJson["results"][0]["geometry"]["location"]["lng"].toString(); 
            else if (apitype === "mapsapi")
                this.lon = googleJson["results"][0]["geometry"]["location"]["lng"]().toString();
        }
        catch (e) {
            this.lon = "";
        }
    }
}

function formatAddress(address) {
    "use strict";
    return `${address.estado}\t${address.cidade}\t${address.endereco}\t${address.complemento}\t${address.bairro}\t${address.cep}\t${address.lat}\t${address.lon}`;
}

function geocodeAPIgeocode() {
    "use strict";
    
    const address_text = document.getElementById("addresses_box").value;
    const address_array = address_text.split("\n");
    document.getElementById("progress_bar").value = 0;
    document.getElementById("progress_bar").max = address_array.length;
    
    let results_text = "Original\tEstado\tCidade\tEndereço\tComplemento\tBairro\tCEP\tLat\tLon\n";
    
    address_array.forEach(async function (address) { // jshint ignore:line
        const request_address = `${BASE}address=${address}&region=${REGION}&language=${LANGUAGE}&key=${API_KEY}`;
        const response = await httpGet(request_address); // jshint ignore:line
        const request_json = JSON.parse(response);
        
        results_text += address + "\t";
        
        if (request_json["status"] === "OK") {
            console.log(request_json);
            const address_object = new Address(request_json, "geoapi");
            const formatted_address = formatAddress(address_object);
            results_text += formatted_address;
        }
        else {
            results_text += request_json["status"];
        }
        
        results_text += "\n";
        document.getElementById("progress_bar").value += 1;
        document.getElementById("results_box").value = results_text;
    }); // jshint ignore:line
}

function mapsAPIGeocode() {
    "use strict";
    
    const address_text = document.getElementById("addresses_box").value;
    const address_array = address_text.split("\n");
    document.getElementById("progress_bar").value = 0;
    document.getElementById("progress_bar").max = address_array.length;
    
    let results_text = "Original\tEstado\tCidade\tEndereço\tComplemento\tBairro\tCEP\tLat\tLon\n";
    
    address_array.forEach(async function (address) { // jshint ignore:line
        results_text += address + "\t";
        
        const geocoder = new google.maps.Geocoder();
        const request = {
            "address": address,
            "region": REGION
        };
        geocoder.geocode(request, function(results, status) {
            if (status == "OK") {
                const request_json = {"results": results};
                console.log(request_json);
                console.log(request_json["results"][0]["geometry"]["location"]["lat"]());
                const address_object = new Address(request_json, "mapsapi");
                const formatted_address = formatAddress(address_object);
                results_text += formatted_address;
                results_text += "\n";
                document.getElementById("progress_bar").value += 1;
                document.getElementById("results_box").value = results_text;
            }
            else {
                results_text += request_json["status"];
                results_text += "\n";
                document.getElementById("progress_bar").value += 1;
                document.getElementById("results_box").value = results_text;
            }
        });
    }); // jshint ignore:line
}

function reverse_geocode() {
    "use strict";
    
    alert("Te trolei ainda preciso fazer essa função");
}

function geocode() {
    "use strict";
    
    const api_choice =  document.querySelector('input[name=api_radio]:checked').value;
    switch (api_choice) {
        case "geoapi":
            geocodeAPIgeocode();
            break;
        case "mapsapi":
            mapsAPIGeocode();
            break;
    }
}

changeTheme();