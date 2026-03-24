/*Amoritization Scheudle
prints budget per month until total balance equals 0
Use line breaks
divs for each separate schedule thingy*/

const form = document.forms[0]
const principalAmountEle = document.querySelector('[name = "principal"]');
const downPaymentEle = document.querySelector('[name = "downPayment"]');
const loanTermEle = document.querySelectorAll('[name = "term"]'); //15 is index 0, 30 is index 1

let totalYears;
let totalMonths;
let principalAmount;
let fixedAnnulInterest;
let monthlyInterestRate;
let monthlyPayment;
let interestPaid;
let loanTotal;




document.addEventListener("submit", function(e) {
    try {
        e.preventDefault();
        outputSchedule();
    }
    catch (error) {
        window.alert(error);
    }
});

function initCalcs() {
    totalYears = loanTermEle[0].checked ? Number(loanTermEle[0].value) : Number(loanTermEle[1].value);
    totalMonths = totalYears * 12;
    principalAmount = Number(principalAmountEle.value) - Number(downPaymentEle.value);
    fixedAnnulInterest = 0.0575;
    monthlyInterestRate = fixedAnnulInterest/12;
    monthlyPayment = ((monthlyInterestRate * principalAmount) / (1 - Math.pow(1 + monthlyInterestRate, -totalMonths)));
    interestPaid = (monthlyPayment * totalMonths) - principalAmount;
    loanTotal = principalAmount + interestPaid;
}

function outputSchedule() {
    initCalcs();
    let loanTermDisplay = document.createElement("p");
    loanTermDisplay.innerHTML = "Loan term (years) " + totalYears;
    let annulInterestDisplay = document.createElement("p");
    annulInterestDisplay.innerHTML = "Annual Interest Rate: " + (fixedAnnulInterest * 100).toFixed(2) + "%";
    let monthlyInterestDisplay = document.createElement("p");
    monthlyInterestDisplay.innerHTML = "Monthly Interest Rate: " + monthlyInterestRate.toFixed(2) + "%";
    let principalDisplay = document.createElement("p");
    principalDisplay.innerHTML = "Principal Loan Amount: $" + principalAmount.toFixed(2);
    let totalInterestDisplay = document.createElement("p");
    totalInterestDisplay.innerHTML = "Total Interest Paid: $" + interestPaid.toFixed(2);
    let loanTotalDisplay = document.createElement("p");
    loanTotalDisplay.innerHTML = "Total Loan Cost: $" + loanTotal.toFixed(2);
    let monthlyPaymentDisplay = document.createElement("p");
    monthlyPaymentDisplay.innerHTML = "Monthly Payment: $" + monthlyPayment.toFixed(2);

    let eleList = [
        loanTermDisplay,
        annulInterestDisplay,
        monthlyInterestDisplay,
        principalDisplay,
        totalInterestDisplay,
        loanTotalDisplay,
        monthlyPaymentDisplay
    ]

    for (let i = 0; i < eleList.length; i++) {
        document.body.append(eleList[i]);
    }

    
}