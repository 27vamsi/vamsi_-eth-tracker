// index.js
const { WebSocketProvider } = require('@ethersproject/providers');
const setupDepositListener = require('./trackDeposits');

const ALCHEMY_WEBSOCKET_URL = 'wss://eth-mainnet.alchemyapi.io/v2/vc2CDrCgb_w41I8ZL3uIngASJ_xfxyaR'; 

const provider = new WebSocketProvider(ALCHEMY_WEBSOCKET_URL);

setupDepositListener();

console.log("WebSocketProvider initialized.");
console.log("Alchemy API URL:", ALCHEMY_WEBSOCKET_URL);
console.log("Starting Ethereum Deposit Tracker...");
