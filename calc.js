const display = document.getElementById("display");
let clearvalue = false;

function appendToDisplay(input) {
    const lastChar = display.value.slice(-1);

    if (display.value === "Error") {
        display.value = "";
        clearvalue = false;
    }

    if (clearvalue) {
        if (/[0-9.]/.test(input)) {
            if (/[+\-*/^]/.test(lastChar)) {
                display.value += input;
            } else {
                display.value = input;
            }
            clearvalue = false;
            return;
        } 
        else if (/[+\-*/^()]/.test(input)) {
            clearvalue = false;
        }
    }

    if (display.value === "" && /[+\-*/^]/.test(input)) {
        display.value = "0" + input;
        return;
    }

    if (/[+\-*/^]/.test(input)) {
        if (!/[+\-*/^]/.test(lastChar)) {
            display.value += input;
        }
    } 
    else if (/[()]/.test(input)) {
        display.value += input;
    } 
    else {
        display.value += input;
    }
}





function clearDisplay(){
    display.value = "";
    clearvalue=false;
}

function calculate() {
    const maxDigit=12;
    try {
        let expression = display.value;

        if (expression.includes("√")) {
            expression = expression.replace(/√\(/g, "Math.sqrt(");
            expression = expression.replace(/(\d)(Math\.sqrt)/g, "$1*$2");
            expression = expression.replace(/\)(Math\.sqrt)/g, ")*$1");
        }
        expression = expression.replace(/(\d)\(/g, "$1*(");
        expression = expression.replace(/\)(\d)/g, ")*$1");
        expression = expression.replace(/([0-9.]+)\(/g, "$1*(");

        let result = eval(expression);
        if (typeof result === "number") {
            const formatted = result.toPrecision(10);
            display.value = parseFloat(formatted).toString();
        } else {
            display.value = result;
        }
        clearvalue = true;

    } catch (error) {
        display.value = "Error";
        clearvalue = true;
    }
}

function squareRoot() {
    if (display.value === "Error") {
        display.value = "";
        clearvalue = false;
    } else {
        const lastChar = display.value.slice(-1);

        if (/\d|\)/.test(lastChar)) {
            display.value += "√(";
        } else {
            display.value += "√(";
        }

        clearvalue = false;
    }
}
