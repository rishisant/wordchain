// SCRIPT.js
// author @rishisant

let topic = ""

// what did you enter??
function change() {
    let input = document.getElementById("inpbox").value;
    document.getElementById("checker").innerHTML = "you entered: " + input;
}

function chooseeasy() {
    sessionStorage.setItem("easymode", "true")
    sessionStorage.setItem("mediummode", "false")
    sessionStorage.setItem("hardmode", "false")
    sessionStorage.setItem("chainedmode", "false")
    location.replace('./html/instructions.html')
}

function choosemedium() {
    sessionStorage.setItem("mediummode", "true")
    sessionStorage.setItem("easymode", "false")
    sessionStorage.setItem("hardmode", "false")
    sessionStorage.setItem("chainedmode", "false")
    location.replace('./html/instructions.html')
}

function choosehard() {
    sessionStorage.setItem("hardmode", "true")
    sessionStorage.setItem("mediummode", "false")
    sessionStorage.setItem("easymode", "false")
    sessionStorage.setItem("chainedmode", "false")
    location.replace('./html/instructions.html')
}

function choosechained() {
    sessionStorage.setItem("chainedmode", "true")
    sessionStorage.setItem("mediummode", "false")
    sessionStorage.setItem("hardmode", "false")
    sessionStorage.setItem("easymode", "false")
    location.replace('./html/instructions.html')
}

function startgame() {
    // set topic to something
    // query from arr
    // done
    if (sessionStorage.getItem("easymode") == "true") {
        location.replace('./easymode.html')
    }
    else if (sessionStorage.getItem("mediummode") == "true") {
        location.replace('./mediummode.html')
    }
    else if (sessionStorage.getItem("hardmode") == "true") {
        location.replace('./hardmode.html')
    }
    else {
        location.replace('./chainedmode.html')
    }
}