let pay = 0;
const salaryPerWork = 100;

/**
 * Increases the workers pay by their salary.
 */
const work = () => {
    pay += salaryPerWork;
}

/**
 * Withdraws the workers pay.
 * @returns {number} Withdrawn pay.
 */
const withdrawPay = () => {
    let temporaryPay = pay;
    pay = 0;
    return temporaryPay;
}

/**
 * 
 * @returns Current Pay
 */
const getPay = () => pay;

const workView = {
    work,
    withdrawPay,
    getPay
}


export default workView;