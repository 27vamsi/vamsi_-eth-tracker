const fs = require('fs');
const path = require('path');

const DEPOSITS_FILE = path.join(__dirname, 'deposits.json');

const saveDeposit = (deposit) => {
    let deposits = [];
    if (fs.existsSync(DEPOSITS_FILE)) {
        const data = fs.readFileSync(DEPOSITS_FILE);
        deposits = JSON.parse(data);
    }

    deposits.push(deposit);

    fs.writeFileSync(DEPOSITS_FILE, JSON.stringify(deposits, null, 2));
    console.log('Deposit saved:', deposit);
};

module.exports = { saveDeposit };
