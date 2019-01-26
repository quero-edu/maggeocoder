/*jshint browser: true*/
/*jshint devel: true */
/*jshint esversion: 6 */
/*jshint sub: true*/
/*jshint strict: true */

const API_KEY = "YOURKEYHERE";
const LANGUAGE = "pt-BR";
const REGION = "BR";
const BASE = "https://maps.googleapis.com/maps/api/geocode/json?";

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

class ProgressBar {
    constructor(){
        this.element = document.getElementById("progress_bar");
        this.element.max = 0;
    }
    
    increment() {
        this.element.value += this.element.value < this.element.max ? 1 : 0;
    }
    
    reset(maxvalue) {
        this.element.max = maxvalue;
        this.element.value = 0;
    }
}

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

function mapsRequest(request) {
    "use strict";
    
    const geocoder = new google.maps.Geocoder();
    return new Promise (function(resolve, reject) {
        geocoder.geocode(request, function(results, status) {
             resolve({"results": results, "status": status});
        });
    });
}

function formatAddress(address) {
    "use strict";
    return `${address.estado}\t${address.cidade}\t${address.endereco}\t${address.complemento}\t${address.bairro}\t${address.cep}\t${address.lat}\t${address.lon}`;
}

function geocode() {
    "use strict";
    
    const address_text = document.getElementById("addresses_box").value;
    const address_array = address_text.split("\n");
    progress_bar.reset(address_array.length);
    
    let results_text = "Original\tEstado\tCidade\tEndereço\tComplemento\tBairro\tCEP\tLat\tLon\n";
    
    address_array.forEach(async function (address) { // jshint ignore:line
        // await
        const api_choice =  document.querySelector('input[name=api_radio]:checked').value;
        let request_json = {};
        
        switch (api_choice) {
            case "geoapi":
                const request_address = `${BASE}address=${address}&region=${REGION}&language=${LANGUAGE}&key=${API_KEY}`;
                const response = await httpGet(request_address); // jshint ignore:line
                request_json = JSON.parse(response);
                break;
            case "mapsapi":
                console.log("In");
                const request = {
                    "address": address,
                    "region": REGION
                };
                request_json = await mapsRequest(request); // jshint ignore:line
                console.log(request_json);
                break;
        }
        
        const address_object = new Address(request_json, api_choice);
        results_text += address + "\t";
        
        if (request_json["status"] === "OK") {
            const formatted_address = formatAddress(address_object);
            results_text += formatted_address;
        }
        else {
            results_text += request_json["status"];
        }
        
        results_text += "\n";
        progress_bar.increment();
        document.getElementById("results_box").value = results_text;
    }); // jshint ignore:line
}

function reverse_geocode() {
    "use strict";
    
    alert("Te trolei ainda preciso fazer essa função");
}

changeTheme();

const map = new google.maps.Map(document.getElementById('map_div'), {
    center: {lat: -14.235004, lng: -51.92528},
    zoom: 4
});

const progress_bar = new ProgressBar();