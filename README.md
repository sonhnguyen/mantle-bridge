# Mantle-Ethereum Bridge API

## Overview

This is a RESTful API server that facilitates Ethereum and Mantle network bridging operations via 2 endpoints:

- Bridging ETH from Ethereum to Mantle.
    ```sh
    curl --location --request POST 'http://localhost:3000/bridge/eth-to-mantle' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "address": "0xYourDestinationAddress",
      "amount": 1.0
    }'
    ```

- Bridging ETH from Mantle to Ethereum.
    ```sh
    curl --location --request POST 'http://localhost:3000/bridge/mantle-to-eth' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "address": "0xYourDestinationAddress",
      "amount": 1.0
    }'
    ```

## Bridge explain

This only works for ETH (the crypto), I do not support ERC20s in this version. The bridge works similar as the official bridge at https://app.mantle.xyz/bridge?network=sepolia

For bridge from Ethereum -> Mantle, we call `depositETHTo` on the bridge contract with destination, value.

For bridge from Mantle -> Ethereum however, I found that the official bridge will take a long time to confirm and there will be a withdraw steps, I probably opt to a more simpler approach where a bridge is simply just a transfer from our wallet to the destination address.

It is required to setup the `BRIDGE_WALLET_PRIVATE_KEY` env var that is our Sepolia Eth wallet private key. This wallet will call bridge contract and also sending ETH.

Possible future improvements:
- Support ERC20s and $MTL
- Better bridge from Mantle -> ETH
- Better support multiple transactions async

## Development

You can execute these scripts using `npm run <script name>`:

- `build`: Compile TypeScript files to the `dist/` directory and run lint checks.
- `serve`: Start the server using the compiled files at `dist/server.js`.
- `test`: Execute all tests located in the `tests/` directory.
- `watch`: Serve the application with hot-reload capabilities as you edit files.

### Build and Serve the Server

To install dependencies and start the server, run:

```sh
npm install
cp .env.sample .env
npm run build
npm run serve
```

### Run Tests

To execute the test suite, use the following commands:

```sh
npm install
npm run test
```

### Run Docker Container

```bash
docker build -t mantle-bridge .
docker run -p 3000:3000 mantle-bridge
```
