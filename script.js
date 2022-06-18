// ===*VARIABLES*=== //
var maxLength = 60;     // Controls max length of equation allowed 
var comma = false;      // Keeps track of if comma has been entered or not
var equals = false;
let operators = [];
let numbers = [];

// ===*FUNCTIONS*=== //

// =BUTTONS= //
// Number button
function buttonNumber(num) {
    var input = document.getElementById("input");

    // If equals
    if (equals) {
        input.innerHTML= "";
        document.getElementById("calculation").innerHTML = "";
        numbers = [];
        operators = [];
        comma = false;
        equals = false;
    }

    // If input isn't too long
    if (input.innerText.length < 16) {
        // Check if input is comma
        if (num == ",") {
            if (!comma) {
                if (input.innerHTML == "") {
                    input.innerHTML = "0,";
                    comma = true;
                } else {
                    input.innerHTML += num;
                    comma = true;
                }
            }
        }
        else {
            input.innerHTML += num;
        }
    }
}

// Operator buttons
function buttonOperator(operator) {
    if (document.getElementById("input").innerHTML != "Error!" && document.getElementById("input").innerHTML != "") {
        var input = document.getElementById("input");
        var calc = document.getElementById("calculation");

        // If equals
        if (equals) {
            document.getElementById("calculation").innerHTML = "";
            numbers = [];
            operators = [];
            equals = false;
        }

        // Make sure new number isn't empty and fits into the calculation
        if (input.innerHTML != "") {
            let num = parseFloat(input.innerHTML.replace(",", "."));
            numbers.push(num);

            if (calc.textContent.length + input.textContent.length + 3 <= maxLength) {
                switch (operator) {
                    case "×":
                        calc.innerHTML += ` ${num.toString().replace(".", ",")} ×`;
                        operators.push("×");
                        break;

                    case "÷":
                        calc.innerHTML += ` ${num.toString().replace(".", ",")} ÷`;
                        operators.push("÷");
                        break;

                    case "+":
                        calc.innerHTML += ` ${num.toString().replace(".", ",")} +`;
                        operators.push("+");
                        break;
                    
                    case "−":
                        calc.innerHTML += ` ${num.toString().replace(".", ",")} −`;
                        operators.push("−");
                        break;
                }
            }
            else {
                return;
            }
        }
        else {
            calc.textContent = calc.textContent.substring(0, calc.textContent.length - 1);
            operators.pop();

            switch (operator) {
                case "÷":
                    calc.innerHTML += "÷";
                    operators.push("÷");
                    break;
                
                case "×":
                    calc.innerHTML += "×";
                    operators.push("×");
                    break;
                
                case "−":
                    calc.innerHTML += "−";
                    operators.push("−");
                    break;
                
                case "+":
                    calc.innerHTML += "+";
                    operators.push("+");
                    break;
            }
        }

        input.innerHTML = "";
        comma = false;
    }
}

// Equals button (solve equation)
function buttonEquals() {
    var input = document.getElementById("input");
    var calc = document.getElementById("calculation");
    
    // Set up arrays etc. for equation algorithm
    if (!equals && numbers.length != 0) {
        if (input.innerHTML != "") {
            let num = parseFloat(input.innerHTML.replace(",", "."));
            numbers.push(num);

            calc.innerHTML += " " + input.innerHTML + " =";
            equals = true;
        } else {
            // If only one number is stored
            if (numbers.length == 1) {
                input.innerHTML = numbers[0].toString().replace(".", ",");
                calc.innerHTML = "";
                numbers = [];
                operators = [];
                
                // Check if comma exists
                if (input.innerHTML.includes(",")) {
                    comma = true;
                }

                return;
            } else {
                calc.textContent = calc.textContent.substring(0, calc.textContent.length - 1) + "=";
                operators.pop();
                equals= true;
            }
        }
    }

    // Calculate...
    for (let k = 0; k < 4; k++) {
        for (let i = operators.length - 1; i >= 0; i--) {
            switch (k) {
                case 0: // Multiply
                    if (operators[i] == "×") {
                        numbers[i] = numbers[i] * numbers[i + 1];
                        operators.splice(i, 1);
                        numbers.splice(i + 1, 1);
                    }
                    break;

                case 1: // Divide
                    if (operators[i] == "÷") {
                        if (numbers[i + 1] != 0) {
                            numbers[i] = numbers[i] / numbers[i + 1];
                            operators.splice(i, 1);
                            numbers.splice(i + 1, 1);
                        } else {
                            input.innerHTML = "Error!";
                            equals = true;
                            return;
                        }
                    }
                    break;

                case 2: // Add
                    if (operators[i] == "+") {
                        numbers[i] = numbers[i] + numbers[i + 1];
                        operators.splice(i, 1);
                        numbers.splice(i + 1, 1);
                    }
                    break;

                case 3: // Subtract
                    if (operators[i] == "−") {
                        numbers[i] = numbers[i] - numbers[i + 1];
                        operators.splice(i, 1);
                        numbers.splice(i + 1, 1);
                    }
                    break;
            }
        }
    }

    input.innerHTML = numbers[0].toString().replace(".", ",");
    equals = true;

    // While result is longer than/equals 16 characters, shorten result
    while (input.textContent.length >= 16) {
        input.textContent = input.textContent.substring(0, input.textContent.length - 1);
    }
}

// Remove button
function remove() {
    var input = document.getElementById("input");

    input.textContent = input.textContent.substring(0, input.textContent.length - 1);

    // Check if comma exists
    if (input.innerHTML.indexOf(",") == -1)
    {
        comma = false;
    }

    // If equals
    if (equals) {
        document.getElementById("calculation").innerHTML = "";
        document.getElementById("input").innerHTML = "";
        numbers = [];
        operators = [];
        equals = false;
    }
}

// Reset buttons
function reset() {
    document.getElementById("input").innerHTML = "";
    comma = false;

    // If equals
    if (equals) {
        document.getElementById("calculation").innerHTML = "";
        numbers = [];
        operators = [];
        equals = false;
    }
}

function resetFull() {
    document.getElementById("input").innerHTML = "";
    document.getElementById("calculation").innerHTML = "";
    comma = false;
    equals = false;
    numbers = [];
    operators = [];
}
