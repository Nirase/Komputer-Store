import fetchComputers from './api/fetchComputers.js';
import bank from './bank/bank.js';
import workView from './work/work.js';
import computersView from './computers/computersView.js';

let computers = await fetchComputers();
let currentComputer = 0
let numberFormatter = new Intl.NumberFormat('se-SE', {style: 'currency', currency: 'SEK'});

let balanceElement = document.getElementById("balance")
let payElement = document.getElementById("pay")
let loanElement = document.getElementById("loanedMoney")

let payLoanButton =  document.getElementById("payLoanButton")
let workButton = document.getElementById("workButton")
let bankButton = document.getElementById("bankButton")
let getLoanButton = document.getElementById("getLoanButton")
let buyButton = document.getElementById("buyButton")

let computerSelect = document.getElementById("computerSelect")

workButton.addEventListener("click", () => {
    workView.work();
    payElement.innerText = numberFormatter.format(workView.getPay());
});

/**
 * Inserts pay into bank balance.
 */
const deposit = () =>
{
    bank.deposit(workView.withdrawPay());
    payElement.innerText = numberFormatter.format(0);
    balanceElement.innerText = numberFormatter.format(bank.getBalance());
    loanElement.innerText = numberFormatter.format(bank.getLoan()); 
    if(bank.getLoan() === 0)
        payLoanButton.classList.add("d-none");
}

bankButton.addEventListener("click", deposit);

buyButton.addEventListener("click", () => {
    bank.withdraw(Number(computers[currentComputer].price));
    balanceElement.innerText = numberFormatter.format(bank.getBalance());
});


/**
 * Takes a loan, up to 2x the balance amount
 */
const getLoan = () => {
    if(bank.takeALoan(Number(prompt("Please enter how much you want to loan: ", 0))))
    {
        balanceElement.innerText = numberFormatter.format(bank.getBalance());
        loanElement.innerText = numberFormatter.format(bank.getLoan());
        payLoanButton.classList.remove("d-none");
    }
}

getLoanButton.addEventListener("click", () => getLoan);

/**
 * Uses pay to directly pay off loan.
 */
const payLoan = () => 
{
    bank.payLoan(workView.withdrawPay());
    balanceElement.innerText = numberFormatter.format(bank.getBalance());
    payElement.innerText = numberFormatter.format(0);
    loanElement.innerText = numberFormatter.format(bank.getLoan());
    if(bank.getLoan() === 0)
        payLoanButton.classList.add("d-none");
}

payLoanButton.addEventListener("click", payLoan);

computerSelect.addEventListener("change", (event) => computersView.updateComputer(event.target.value, numberFormatter));
computersView.initializeComputers(computers, computerSelect);
computersView.updateComputer(0, numberFormatter);
