import getComputers from './modules/getComputers.js';
import bank from './modules/bank.js';
import workView from './modules/work.js';

let computers = await getComputers();
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

let computerSelect = document.getElementById("laptops")

let computerInformationElements = {
    features: document.getElementById("features"),
    price: document.getElementById("computerprice"),
    description: document.getElementById("computerdescription"),
    title: document.getElementById("computertitle"),
    image: document.getElementById("computerImage")
}

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

getLoanButton.addEventListener("click", () => {
    if(bank.takeALoan(Number(prompt("Please enter how much you want to loan: ", 0))))
    {
        balanceElement.innerText = numberFormatter.format(bank.getBalance());
        loanElement.innerText = numberFormatter.format(bank.getLoan());
        payLoanButton.classList.remove("d-none");
    }
});

buyButton.addEventListener("click", () => {
    bank.withdraw(Number(computers[currentComputer].price));
    balanceElement.innerText = numberFormatter.format(bank.getBalance());
});

computerSelect.addEventListener("change", (event) => updateComputer(event.target.value));

payLoanButton.addEventListener("click", () => {
    bank.payLoan(workView.withdrawPay());
    balanceElement.innerText = numberFormatter.format(bank.getBalance());
    payElement.innerText = numberFormatter.format(0);
    loanElement.innerText = numberFormatter.format(bank.getLoan());

    if(bank.getLoan() === 0)
        payLoanButton.classList.add("d-none");

});

computers.map((computer, i) =>
{
    let newOption = document.createElement("option");
    newOption.value = i;
    newOption.innerHTML = computer.title;
    computerSelect.append(newOption)
});


const updateComputer = (index) =>
{
    let features = "";

    for(let i = 0; i < computers[index].specs.length; ++i)
    {
        features += computers[index].specs[i] + "<br>";
    }

    computerInformationElements.features.innerHTML = features;
    computerInformationElements.price.innerText = computers[index].price;
    computerInformationElements.description.innerText = computers[index].description;
    computerInformationElements.title.innerText = computers[index].title;
    computerInformationElements.image.src = "https://hickory-quilled-actress.glitch.me/" + computers[index].image;
    computerInformationElements.image.alt = computers[index].title;
    currentComputer = index
}

updateComputer(0);
