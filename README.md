# Lottery Contract


###  Prerequisite

 1. Install **Metamask** as Google Chrome Extension and Create an account.
 2.  Request Ether by sharing your ethereum address in social media <br>(`https://faucet.rinkeby.io/)`
 3. Get 0.01 ether free by giving the ethereum address <br>`(http://rinkeby-faucet.com/)`
 4. Create an account in [https://infura.io](https://infura.io/)
 5. Create .env file in root directory and add these line to it.
	 

	> mnemonic = 'Your mnemonic code' <br>
	link = 'Your infura end point link '

 
### Dependencies Used
| Name | Version | Description |
|--|--|--|
| solc |0.4.26 | Programming language to write smart contracts |
| ganache-cli  | 6.4.4 | Local Ethereum Test Network |
| mocha | 6.1.4 | JavaScript test framework |
|truffle-hdwallet-provider |0.0.3 | The **Truffle HDWallet provider** is a convenient and easy to configure network connection to ethereum through infura.io |
| web3 |1.0.0-beta.55 |Ethereum JavaScript API which connects to the Generic JSON RPC spec. |
| dotenv|8.0.0 | Loads environment variables from a `.env` file into `process.env`|

	
### Steps to Setup
**1. Clone the Application**

    git clone https://github.com/RocktimRajkumar/Ethereum-Inbox.git
    
**2.  Intall dependencies/npm modules**
Go to the project directory and execute the following command from the terminal.

    npm install
    
**3. Test Contract using mocha**

    npm test
   
   **4. Deploy the Contract in Rinkeby Test Network**
   
    node deploy.js

`


