/*jshint browser: true*/
/*jshint devel: true */
/*jshint esversion: 6 */
/*jshint sub:true*/
/*jshint strict: true */

const API_KEY = "***REMOVED***";
const LANGUAGE = "pt-BR";
const REGION = "BR";
const BASE = "https://maps.googleapis.com/maps/api/geocode/json?";

function httpGet(url) {
    "use strict";
    
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true); // false for synchronous request
    xmlHttp.send(null);
    
    return xmlHttp.responseText;
}

function myAsyncFunction(url) {
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

function formatAddress(address) {
    "use strict";
    return `${address.estado}\t${address.cidade}\t${address.endereco}\t${address.complemento}\t${address.bairro}\t${address.cep}\t${address.lat}\t${address.lon}`;
}

function geocode() {
    "use strict";
    
    const address_text = document.getElementById("addresses_box").value;
    const address_array = address_text.split("\n");
    document.getElementById("progress_bar").value = 0;
    document.getElementById("progress_bar").max = address_array.length;
    
    let results_text = "Original\tEstado\tCidade\tEndereço\tComplemento\tBairro\tCEP\tLat\tLon\n";
    
    address_array.forEach(async function (address) {
        const request_address = `${BASE}address=${address}&region=${REGION}&language=${LANGUAGE}&key=${API_KEY}`;
        const response = await myAsyncFunction/*httpGet*/(request_address);
        console.log(response);
        const request_json = JSON.parse(response);
        
        results_text += address + "\t";
        
        if (request_json["status"] === "OK") {
            const address_object = new Address(request_json);
            const formatted_address = formatAddress(address_object);
            results_text += formatted_address;
        }
        else {
            results_text += request_json["status"];
        }
        
        results_text += "\n";
        document.getElementById("progress_bar").value += 1;
        document.getElementById("results_box").value = results_text;
    });
}

function reverse_geocode() {
    "use strict";
    alert("R_Geo!");
}