/*jshint browser: true*/
/*jshint devel: true */
/*jshint esversion: 6 */
/*jshint sub: true*/
/*jshint strict: true */

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
        document.getElementById("darkmode_link").innerHTML = "Habilitar Darkmode 🌒";
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
        document.getElementById("darkmode_link").innerHTML = "Desabilitar Darkmode 🌖";
        localStorage.setItem("color_mode", "darkmode");
    }
    
}

function updateTheme() {
    "use strict";
    
    if (localStorage.getItem("color_mode") === "darkmode") {
        localStorage.setItem("color_mode", "lightmode");
        changeTheme();
    }
}

function saveRemoveLinesState() {
    "use strict";
    const checked = document.getElementById("removelines_checkbox").checked ? "true" : "false";
    localStorage.setItem("removelines_state", checked);
}

function saveRemoveTabsState() {
    "use strict";
    const checked = document.getElementById("removetabs_checkbox").checked ? "true" : "false";
    localStorage.setItem("removetabs_state", checked);
}

function saveAutoZoomState() {
    "use strict";
    const checked = document.getElementById("autozoom_checkbox").checked ? "true" : "false";
    localStorage.setItem("autozoom_state", checked);
}

function saveRemoveMarkersState() {
    "use strict";
    const checked = document.getElementById("removemarkers_checkbox").checked ? "true" : "false";
    localStorage.setItem("removemarkers_state", checked);
}

function saveGenerateCSVState() {
    "use strict";
    const checked = document.getElementById("generatecsv_checkbox").checked ? "true" : "false";
    localStorage.setItem("generatecsv_state", checked);
    if (checked == "true")
        document.getElementById("addbom_checkbox").disabled = false;
    else
        document.getElementById("addbom_checkbox").disabled = true;
}

function saveAddBOMState() {
    "use strict";
    const checked = document.getElementById("addbom_checkbox").checked ? "true" : "false";
    localStorage.setItem("addbom_state", checked);
}

function updateRemoveLinesState() {
    "use strict";
    if (localStorage.getItem("removelines_state") === "false")
        document.getElementById("removelines_checkbox").checked = false;
}

function updateRemoveTabsState() {
    "use strict";
    if (localStorage.getItem("removetabs_state") === "false")
        document.getElementById("removetabs_checkbox").checked = false;
}

function updateAutoZoomState() {
    "use strict";
    if (localStorage.getItem("autozoom_state") === "false")
        document.getElementById("autozoom_checkbox").checked = false;
}

function updateRemoveMarkersState() {
    "use strict";
    if (localStorage.getItem("removemarkers_state") === "false")
        document.getElementById("removemarkers_checkbox").checked = false;
}

function updateGenerateCSVState() {
    "use strict";
    if (localStorage.getItem("generatecsv_state") === "true") {
        document.getElementById("generatecsv_checkbox").checked = true;
        document.getElementById("addbom_checkbox").disabled = false;
    }
    else {
        document.getElementById("addbom_checkbox").disabled = true;
    }
}

function updateAddBOMState() {
    "use strict";
    if (localStorage.getItem("addbom_state") === "false")
        document.getElementById("addbom_checkbox").checked = false;
}

function removeEmptyLinesEnabled() {
    "use strict";
    return document.getElementById("removelines_checkbox").checked;
}

function removeTabsEnabled() {
    "use strict";
    return document.getElementById("removetabs_checkbox").checked;
}

function autoZoomEnabled() {
    "use strict";
    return document.getElementById("autozoom_checkbox").checked;
}

function removeMarkersEnabled() {
    "use strict";
    return document.getElementById("removemarkers_checkbox").checked;
}

function generateCSVEnabled() {
    "use strict";
    return document.getElementById("generatecsv_checkbox").checked;
}

function addBOMEnabled() {
    "use strict";
    return document.getElementById("addbom_checkbox").checked;
}

function showOptions() {
    "use strict";
    const state = document.getElementById("options_div").style.display;
    
    if (state === "none") {
        document.getElementById("options_div").style.display = "block";
        document.getElementById("options_link").innerHTML = "Esconder Opções";
    }
    else {
        document.getElementById("options_div").style.display = "none";
        document.getElementById("options_link").innerHTML = "Mostrar Opções";
    }
}

updateTheme();
updateRemoveLinesState();
updateRemoveTabsState();
updateAutoZoomState();
updateRemoveMarkersState();
updateGenerateCSVState();
updateAddBOMState();