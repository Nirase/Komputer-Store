let balance = 0;
let loan = 0;

/**
 * Deposits money into the bank account, if there's an outstanding loan, up to 10% of the deposit is used for the loan.
 * 
 * @param {number} deposit Amount of money to diposit into the bank account
 * 
 */
const deposit = (deposit) => {
    if(loan > 0 && loan < (deposit/10))
    {
        deposit -= loan;
        loan = 0;
    }
    else if(loan > 0)    
    {
        loan -= (deposit / 10);
        deposit -= deposit/10;
    }

    balance += deposit;
}

/**
 * Withdraws an amount of money from the bank account
 * @param {number} withdrawal How much money should be withdrawn from the bank account 
 */
const withdraw = (withdrawal) => {
    if(balance < withdrawal)
    {
        window.confirm("Not enough money in the bank");
        return;
    }

    balance -= withdrawal;
    window.confirm("Congratulations on your new purchase!");
}

/**
 * Attempts to take a loan, the user can only have one loan at a time and the loan amount can not be greater than 2 times their current balance. 
 * @param {number} loanAmount 
 * @returns Returns true if a loan could be taken, false if it could not
 */
const takeALoan = (loanAmount) => {
    if(isNaN(loanAmount))
    {
        window.confirm("Please enter a number");
        return false;   
    }
    if(loan > 0)
    {
        window.confirm("Please pay off your outstanding loan first");
        return false;
    }
    if(loanAmount > balance * 2)
    {
        window.confirm("You may only loan up to twice the amount of money you have");
        return false;
    }
    if(loanAmount === 0)
        return false;

    loan = loanAmount;
    balance += loanAmount;
    return true;
}

/**
 * Uses the deposit to pay off as much as possible from the loan. Any leftover money is deposited into the bank account.
 * @param {Number} deposit How much money should be spent on paying the loan 
 */
const payLoan = (deposit) => {
    if(deposit > loan)
    {
        deposit -= loan;
        loan = 0;
        balance += deposit;
        return;
    }
    loan -= deposit;
}
/**
 * @returns Current balance
 */
const getBalance = () => {return balance;}

/**
 * @returns Current loan amount
 */
const getLoan = () => {return loan;}

const bank = {
    getBalance, 
    getLoan,
    deposit,
    withdraw,
    takeALoan,
    payLoan
}

export default bank;