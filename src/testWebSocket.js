const { ethers } = require("ethers");

function createWebSocketProvider(alchemyWebSocketUrl) {
    let provider;

    const connect = () => {
        console.log("Attempting WebSocket connection...");
        provider = new ethers.providers.WebSocketProvider(alchemyWebSocketUrl);

        provider._websocket.on("open", () => {
            console.log("WebSocket connection established.");
        });

        provider._websocket.on("close", () => {
            console.error("WebSocket connection closed. Reconnecting...");
            reconnect();  
        });

        provider._websocket.on("error", (error) => {
            console.error("WebSocket error occurred:", error);
        });

        return provider;
    };

    const reconnect = () => {
        console.log("Reconnecting WebSocket...");
        setTimeout(connect, 3000); 
    };

    return connect(); 
}

module.exports = { createWebSocketProvider };
