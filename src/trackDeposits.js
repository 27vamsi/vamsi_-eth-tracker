const ethers = require('ethers');
const provider = require('./provider');
const winston = require('winston');
const fs = require('fs');
const DepositContractABI = require('../abi/DepositContractABI.json');

const depositContractAbi = DepositContractABI;

const depositContractAddress = '0x00000000219ab540356cBB839Cbe05303d7705Fa';

const depositContract = new ethers.Contract(depositContractAddress, depositContractAbi, provider);

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logs/deposit.log' })
    ],
});

async function setupDepositListener() {
    console.log("Setting up DepositEvent listener...");

    depositContract.on('DepositEvent', async (pubkey, withdrawal_credentials, amount, signature, index, event) => {
        const transactionHash = event.transactionHash;
        const blockNumber = event.blockNumber;
        const transaction = await provider.getTransaction(transactionHash);
        const block = await provider.getBlock(blockNumber);

        const depositData = {
            pubkey: pubkey,
            withdrawalCredentials: withdrawal_credentials,
            amount: ethers.utils.formatEther(amount), // Convert from Wei to ETH
            signature: signature,
            index: index.toString(),
            blockNumber: blockNumber,
            blockTimestamp: new Date(block.timestamp * 1000).toISOString(), // Convert Unix timestamp to ISO string
            fee: ethers.utils.formatEther(transaction.gasPrice.mul(transaction.gasLimit)), // Calculate fee
            hash: transactionHash,
            timestamp: new Date().toISOString()
        };

        console.log("New deposit detected:");
        console.log(depositData);

        logger.info(depositData);

        storeDepositData(depositData);
    });

    console.log("DepositEvent listener set up successfully.");
}

function storeDepositData(depositData) {
    const data = JSON.stringify(depositData, null, 2);
    fs.appendFile('logs/deposits.txt', `${data}\n`, (err) => {
        if (err) {
            console.error('Failed to write deposit data to file', err);
        } else {
            console.log('Deposit data stored successfully.');
        }
    });
}

// handle errors from the provider
provider._websocket.on('error', (error) => {
    console.error('WebSocket Error:', error);
    logger.error(`WebSocket Error: ${error}`);
});

provider._websocket.on('close', () => {
    console.warn('WebSocket connection closed. Attempting to reconnect...');
    logger.warn('WebSocket connection closed. Attempting to reconnect...');

    setTimeout(() => {
        provider._websocket = new ethers.providers.WebSocketProvider(ALCHEMY_WEBSOCKET_URL);
        setupDepositListener(); // Re-establish the deposit listener
    }, 5000);
});

module.exports = setupDepositListener;
