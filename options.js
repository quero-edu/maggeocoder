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

updateTheme();