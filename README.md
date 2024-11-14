
The Ethereum Deposit Tracker is a Node.js application designed to monitor and log deposit events on the Ethereum Beacon Deposit Contract. It uses the Alchemy WebSocket API to listen for deposit events and logs the relevant details to both a log file and a text file. The application also supports basic error handling and reconnection logic for the WebSocket provider.

Features:
Monitors deposit events on the Ethereum Beacon Deposit Contract.
Logs deposit details including blockNumber, blockTimestamp, fee, hash, and pubkey.
Handles WebSocket errors and automatic reconnection.
Configurable to use different Ethereum nodes or providers.

Installation
Clone the repository:

git clone 
cd to file
npm install

Configuration
Provider Setup: Ensure you have a valid Alchemy API key for connecting to the Ethereum network. Set the WebSocket URL in the provider.js file.
Contract ABI and Address: Place the ABI JSON file for the Beacon Deposit Contract in the abi directory and set the contract address in trackDeposits.js.

Start the application:
node src/index.js

The application will output log messages to the console and write deposit details to logs/deposit.log and logs/deposits.txt.
