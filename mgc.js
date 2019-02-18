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
    constructor(googleJson) {
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
            this.lat = googleJson["results"][0]["geometry"]["location"]["lat"].toString();
        }
        catch (e) {
            this.lat = "";
        }
        try {
            this.lon = googleJson["results"][0]["geometry"]["location"]["lng"].toString(); 
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

class GoogleMap {
    constructor() {
        this.map = new google.maps.Map(document.getElementById('map_div'), {
            center: {lat: -14.235004, lng: -51.92528},
            zoom: 4
        });
        this.markers = [];
    }
    
    addMarker(marker) {
        marker.setMap(this.map);
        this.markers.push(marker);
    }
    
    clearMarkers() {
        this.markers.forEach(function(marker){
            marker.setMap(null);
        });
        this.markers = [];
    }
}

function changeTheme() {
    "use strict";
    
    if (localStorage.getItem("color_mode") === "darkmode"){ 
        document.getElementById("body").style.color = "#000";
        document.getElementById("body").style.backgroundColor = "#FFF";
        const textareas = document.getElementsByTagName("textarea");
        for (let element of textareas) {
            element.style.color = "#000";
            element.style.backgroundColor = "#FFF";
        }
        document.getElementById("progress_bar").style.backgroundColor = "#FFF";
        
        localStorage.setItem("color_mode", "lightmode");
    }
    else {
        document.getElementById("body").style.color = "#DDD";
        document.getElementById("body").style.backgroundColor = "#333";
        const textareas = document.getElementsByTagName("textarea");
        for (let element of textareas) {
            element.style.color = "#DDD";
            element.style.backgroundColor = "#333";
        }
        document.getElementById("progress_bar").style.backgroundColor = "#333";
        
        localStorage.setItem("color_mode", "darkmode");
    }
    
}

function updateTheme() {
    "use strict";
    
    if (localStorage.getItem("color_mode") === "darkmode"){
        localStorage.setItem("color_mode", "lightmode");
        changeTheme();
    }
}

function saveRemovelinesCheckboxState() {
    "use strict";
    const checked = document.getElementById("removelines_checkbox").checked ? "true" : "false";
    localStorage.setItem("removelines_state", checked);
}

function updateRemovelinesCheckboxState() {
    "use strict";
    
    if (localStorage.getItem("removelines_state") == "false")
        document.getElementById("removelines_checkbox").checked = false;
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

function formatAddress(address) {
    "use strict";
    return `${address.estado}\t${address.cidade}\t${address.endereco}\t${address.complemento}\t${address.bairro}\t${address.cep}\t${address.lat}\t${address.lon}`;
}

async function geocode(type) { // jshint ignore:line
    "use strict";
    
    const address_text = document.getElementById("addresses_box").value;
    let address_array = address_text.split("\n");
    
    if (document.getElementById("removelines_checkbox").checked)
        address_array = address_array.filter(line => line != "");
    
    progress_bar.reset(address_array.length);
    google_map.clearMarkers();
    
    let results_text = "Original\tEstado\tCidade\tEndereço\tComplemento\tBairro\tCEP\tLat\tLon\n";
    let promises = [];
    
    address_array.forEach(function (address) { // jshint ignore:line
        switch (type) {
            case "standard":
                const geocode_request_address = `${BASE}address=${address}&region=${REGION}&language=${LANGUAGE}&key=${API_KEY}`;
                promises.push(httpGet(geocode_request_address));
                break;
            case "reverse":
                const lat_lon = address.split("\t");
                const reverse_request_address = `${BASE}latlng=${lat_lon[0] + "," + lat_lon[1]}&language=${LANGUAGE}&key=${API_KEY}`;
                promises.push(httpGet(reverse_request_address));
                break;
        }
    }); // jshint ignore:line
    
    for (let i = 0; i < address_array.length; i++) {
        const result = await promises[i]; // jshint ignore:line
        const request_json = JSON.parse(result);
        
        const address_object = new Address(request_json);
        results_text += address_array[i] + "\t";
        
        if (request_json["status"] === "OK") {
            const formatted_address = formatAddress(address_object);
            results_text += formatted_address;
            const marker = new google.maps.Marker({
                position: {
                    lat: parseFloat(address_object.lat),
                    lng: parseFloat(address_object.lon)
                },
                animation: google.maps.Animation.DROP,
            });
            google_map.addMarker(marker);
        }
        else {
            results_text += request_json["status"];
        }
        
        results_text += "\n";
        progress_bar.increment();
        document.getElementById("results_box").value = results_text;
    }
}

updateTheme();
updateRemovelinesCheckboxState();

const progress_bar = new ProgressBar();
const google_map = new GoogleMap();