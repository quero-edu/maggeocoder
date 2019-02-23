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

function removeEmptyLinesEnabled() {
    "use strict";
    return document.getElementById("removelines_checkbox").checked;
}

function removeTabsEnabled() {
    "use strict";
    return document.getElementById("removetabs_checkbox").checked;
}

function showOptions() {
    "use strict";
    const state = document.getElementById("options_div").style.display;
    
    if (state === "none")
        document.getElementById("options_div").style.display = "block";
    else
        document.getElementById("options_div").style.display = "none";
}

updateTheme();
updateRemoveLinesState();
updateRemoveTabsState();

