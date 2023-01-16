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

bankButton.addEventListener("click", () => {
    bank.deposit(workView.withdrawPay());
    payElement.innerText = numberFormatter.format(0);
    balanceElement.innerText = numberFormatter.format(bank.getBalance());
    loanElement.innerText = numberFormatter.format(bank.getLoan()); 
    if(bank.getLoan() === 0)
        payLoanButton.classList.add("d-none");
});


buyButton.addEventListener("click", () => {
    bank.withdraw(Number(computers[currentComputer].price));
    balanceElement.innerText = numberFormatter.format(bank.getBalance());
});

getLoanButton.addEventListener("click", () => {
    if(bank.takeALoan(Number(prompt("Please enter how much you want to loan: ", 0))))
    {
        balanceElement.innerText = numberFormatter.format(bank.getBalance());
        loanElement.innerText = numberFormatter.format(bank.getLoan());
        payLoanButton.classList.remove("d-none");
    }
});

payLoanButton.addEventListener("click", () => {
    bank.payLoan(workView.withdrawPay());
    balanceElement.innerText = numberFormatter.format(bank.getBalance());
    payElement.innerText = numberFormatter.format(0);
    loanElement.innerText = numberFormatter.format(bank.getLoan());
    if(bank.getLoan() === 0)
        payLoanButton.classList.add("d-none");

});

computerSelect.addEventListener("change", (event) => computersView.updateComputer(event.target.value, numberFormatter));
computersView.initializeComputers(computers, computerSelect);
computersView.updateComputer(0, numberFormatter);
