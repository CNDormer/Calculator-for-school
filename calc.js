const display = document.getElementById("display");
let clearvalue = false;

function appendToDisplay(input) {
    const lastChar = display.value.slice(-1);

    if (display.value === "Error") {
        display.value = "";
        clearvalue = false;
    }

    if (display.value === "" && /[+\-*/^]/.test(input)) {
        display.value = "0" + input;
        clearvalue = false;
        return;
    }

    if (clearvalue) {
        if (/[0-9.]/.test(input)) {
            display.value = input;
            clearvalue = false;
            return;
        }
        if (/[+\-*/^]/.test(input)) {
            display.value = "0" + input;
            clearvalue = false;
            return;
        }
    }

    if (/[+\-*/^]/.test(input)) {
        if (!/[+\-*/^]/.test(lastChar)) {
            display.value += input;
        }
    } 
    else {
        display.value += input;
    }
}




function clearDisplay(){
    display.value = "";
    clearvalue=false;
}

function calculate(){
    try{
        display.value = eval(display.value);
        clearvalue=true;
    }
    catch(error){
        display.value = "Error";
        clearvalue=true
    }
}
/* Add /[0-9.]+/g with replace element for multiplycation and somthing else*/
