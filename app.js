let pay = 0
let balance = 0
let loaning = false
let loanedMoney = 0
let currentComputer = 0

let balanceElement = document.getElementById("balance")
let payElement = document.getElementById("pay")

async function getComputers() 
{
    try
    {
        const computers = await fetch("https://hickory-quilled-actress.glitch.me/computers");
        const data = await computers.json();
        return data;
    }
    catch(e)
    {
        console.error(e);
    }
}
/*
import computers from './modules/getJson.js';

let computerSelect = document.getElementById("laptops");

computers.map((computer, i) =>
    {
        let newOption = document.createElement("option");
        newOption.value = i;
        newOption.innerHTML = computer.title;
        computerSelect.append(newOption)
    }
)
updateComputer(0);
*/


let computers = null;
let computerSelect = document.getElementById("laptops");
getComputers().then(data => 
{
    computers = data
    data.map((computer, i) =>
        {
            let newOption = document.createElement("option");
            newOption.value = i;
            newOption.innerHTML = computer.title;
            computerSelect.append(newOption)
        }
    )
    updateComputer(0);
});

function updateComputer(index)
{
    let features = "";

    for(let i = 0; i < computers[index].specs.length; ++i)
    {
        features += computers[index].specs[i] + "<br>";
    }

    document.getElementById("features").innerHTML = features;
    document.getElementById("computerprice").innerHTML = computers[index].price;
    document.getElementById("computerdescription").innerHTML = computers[index].description;
    document.getElementById("computertitle").innerHTML = computers[index].title;
    document.getElementById("computerImage").src = "https://hickory-quilled-actress.glitch.me/" + computers[index].image;
    document.getElementById("computerImage").alt = computers[index].title;
    currentComputer = index
}

function buy()
{
    let price = Number(computers[currentComputer].price);
    if(price <= balance)
    {
        balance -= price;
        document.getElementById("balance").innerHTML = balance;
        window.confirm("You just bought a new computer!");
    }
    else
        window.confirm("You do not have enough money to buy this computer");
}


function work()
{
    pay += 100;
    payElement.innerHTML = pay;
}

function payLoan()
{
    console.log("hello");
}

function bank()
{
    if(loanedMoney < (pay/10) && loaning)
    {
        pay -= loanedMoney;
        loanedMoney = 0;
        loaning = false;
        document.getElementById("payLoan").remove();
    }

    if(loaning)    
    {
        
        loanedMoney -= (pay / 10);
        pay -= pay/10;
    }

    balance += pay;
    balanceElement.innerHTML = balance;
    payElement.innerHTML = 0;
    
    pay = 0;
}

function loan()
{
    if(loaning)
        return;

    let money = Number(prompt("Please enter how much you want to loan: ", 0));
    if(money > balance * 2)
        return;
    if(money === NaN || money === 0)
        return;
    loanedMoney = money;
    loaning = true;
    balance += money;
    balanceElement.innerHTML = balance;
    let loanButton = document.createElement("button");
    loanButton.innerText = "Pay Loan";
    loanButton.id = "payLoan";
    loanButton.onclick = function()
    {
        if(pay > loanedMoney)
        {
            pay -= loanedMoney;
            balance += pay;
            pay = 0; 
            balanceElement.innerHTML = balance;
            loaning = false;
            loanedMoney = 0;
        }
        else
        {
            loanedMoney -= pay;
        }

        pay = 0;
        payElement.innerHTML = pay;

        if(!loaning)
            document.getElementById("payLoan").remove();
    };

    document.getElementById("Work").append(loanButton);
}