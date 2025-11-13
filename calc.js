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

function clearDisplay() {
    display.value = "";
    clearvalue = false;
}

function calculate() {
    try {
        let expression = display.value;

        if (expression.startsWith("!")) {
            display.value = "Error";
            clearvalue = true;
            return;
        }
        function log10(x) {
            return Math.log10(x);
        }


        const sciMatches = [];
        expression = expression.replace(/[0-9]+(?:\.[0-9]+)?E[+-]?\d+/gi, (m) => {
            const key = `__SCI${sciMatches.length}__`;
            sciMatches.push(m);
            return key;
        });

        expression = expression.replace(/√\(/g, "Math.sqrt(");
        expression = expression.replace(/sin\(/g, "Math.sin(Math.PI/180*");
        expression = expression.replace(/cos\(/g, "Math.cos(Math.PI/180*");
        expression = expression.replace(/tan\(/g, "Math.tan(Math.PI/180*");

        expression = expression.replace(/(\d|π|Π|𝑒)\s*(log|ln)\(/g, "$1*$2(");

        expression = expression.replace(/(^|[^0-9πΠ𝑒])log\(/g, "$1log10(");
        expression = expression.replace(/(^|[^0-9πΠ𝑒])ln\(/g, "$1Math.log(");
        if (expression.startsWith("log(")) expression = "log10(" + expression.slice(4);
        if (expression.startsWith("ln(")) expression = "Math.log(" + expression.slice(3);

        expression = expression.replace(/π/g, "Math.PI");
        expression = expression.replace(/Π/g, "(3.14)");
        expression = expression.replace(/𝑒/g, "Math.E");

        expression = expression.replace(/(\d+|\([^()]+\))!/g, "factorial($1)");

        for (let i = 0; i < sciMatches.length; i++) {
            expression = expression.replace(`__SCI${i}__`, sciMatches[i]);
        }

        expression = expression.replace(/(\d|\)|Math\.PI|Math\.E|3\.14)(\()/g, "$1*$2");
        expression = expression.replace(/(\d)(Math\.)/g, "$1*$2");
        expression = expression.replace(/\)(\d)/g, ")*$1");
        expression = expression.replace(/\)(Math\.)/g, ")*$1");
        expression = expression.replace(/(Math\.(?:PI|E|sqrt|log|log10))(\d)/g, "$1*$2");
        expression = expression.replace(/(Math\.(?:PI|E))\(/g, "$1*(");
        expression = expression.replace(/\^/g, "**");

        expression = expression.replace(/log10\*\(/g, "log10(");

        console.log("Evaluating:", expression);

        let result = eval(expression);

        if (typeof result === "number" && isFinite(result)) {
            display.value = parseFloat(result.toPrecision(10)).toString();
        } else {
            display.value = "Error";
        }

        clearvalue = true;
    } catch (e) {
        console.error("Why?:", e);
        display.value = "Error";
        clearvalue = true;
    }
}





function squareRoot() {
    if (display.value === "Error") display.value = "";
    display.value += "√(";
    clearvalue = false;
}

function trigCalculateSin() {
    if (display.value === "Error") display.value = "";
    display.value += "sin(";
    clearvalue = false;
}

function trigCalculateCos() {
    if (display.value === "Error") display.value = "";
    display.value += "cos(";
    clearvalue = false;
}

function trigCalculateTan() {
    if (display.value === "Error") display.value = "";
    display.value += "tan(";
    clearvalue = false;
}

function logFunction() {
    if (display.value === "Error") display.value = "";
    display.value += "log(";
    clearvalue = false;
}

function lnFunction() {
    if (display.value === "Error") display.value = "";
    display.value += "ln(";
    clearvalue = false;
}

function piFunction() {
    if (display.value === "Error") display.value = "";
    display.value += "π";
    clearvalue = false;
}

function eulerFunction() {
    if (display.value === "Error") display.value = "";
    display.value += "𝑒";
    clearvalue = false;
}

function piButThreeDigits() {
    if (display.value === "Error") display.value = "";
    display.value += "Π";
    clearvalue = false;
}

function sNotation() {
    if (display.value === "Error") display.value = "";
    display.value += "E";
    clearvalue = false;
}

function factorialNumber(){
    if (display.value === "Error") display.value = "";
    display.value += "!";
    clearvalue = false;
}

function factorial(n){
    if (n < 0) return NaN;
    if (!Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}
