# Project Info

This repo displays the final project "Social Media Block Explorer" developed by Project Group 1 for ETHDenver Solidity Bootcamp 2022.

## Social Media Block Explorer

Inspired during the bootcamp when instructor given students task to explore transaction hash on etherscan. We started to wonder what if the block explorer actually contains the walkthrough of whats happening?

<br/>
Having an idea in mind, we set out to build a block explorer that able to let users propose comments on the walkthrough of what's happening on a transaction. Other participants also able to participate by giving any comments that they deemed useful an 'upvote'. Through this, we able to filter out good comments and build a simulation of community where there is proposer & members...sorta like a DAO! (Maybe an idea to build on top of this project? 😜)

<br/>
The project retrieves information of transaction hash (only applicable to Ethereum Mainnet and Goerli Testnet) such as data, timestamp, from, to and etc while giving users who login with Ethereum wallet ability to leave comments and give any available comment an upvote on a specific transaction hash. The function is built on Goerli Testnet written using solidity for smart contract interactions and React Js on front end display & retrieving of transaction hash info.

## Project Setup

To install required dependencies:

```
npm install / yarn install
```

Insert your respective Mainnet & Goerli HTTP API URL in [this](./explorer/src/utils/config.json) file by replacing `REACT_APP_MAINNET_URL` and `REACT_APP_GOERLI_URL` respectively.

To start the project locally:

```
npm start / yarn start
```

# Project Demo

<figure><img src="./explorer/src/assets/img/demo1.png" alt="demo1" style="width:100%"><figcaption align = "center"><b>Fig.1 - Home Page of Social Media Block Explorer</b></figcaption></figure>

<br/>

<figure><img src="./explorer/src/assets/img/demo2.png" alt="demo2" style="width:100%"><figcaption align = "center"><b>Fig.2 - Transaction page showing comments and upvote</b></figcaption></figure>

<br/>

To test our website, visit [this link](https://social-media-block-explorer.vercel.app/). Feel free to choose Goerli > transaction and enter transaction hash `0x91c2d437cfe2058bac7e9f767b947751407acd9f409d8bccb62e8c3e9b074a10` which is the transaction hash we used to demo our product during presentation.
