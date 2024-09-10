const ethers = require('ethers');

const ALCHEMY_WEBSOCKET_URL = process.env.ALCHEMY_WEBSOCKET_URL || 'wss://eth-mainnet.alchemyapi.io/v2/vc2CDrCgb_w41I8ZL3uIngASJ_xfxyaR';

let provider;

try {
    provider = new ethers.providers.WebSocketProvider(ALCHEMY_WEBSOCKET_URL);
    console.log('WebSocketProvider initialized.');
} catch (error) {
    console.error('Failed to initialize WebSocketProvider:', error);
}

module.exports = provider;
