const contract = require('../artifacts/contracts/Salamun.sol/Salamun.json');
const contractAddress = 'contractAddress';

const Web3 = require('web3');
const web3 = new Web3('ALCHEMY_URL');
const nftContract = new web3.eth.Contract(contract.abi,contractAddress);

const ACCOUNT_PUBLIC_KEY = 'ACCOUNT_PUBLIC_KEY';
const ACCOUNT_PRIVATE_KEY = 'ACCOUNT_PRIVATE_KEY';

async function requestRandomNumber(){
    const nonce = await web3.eth.getTransactionCount(ACCOUNT_PUBLIC_KEY,'latest');

    const tx = {
        from: ACCOUNT_PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 1000000,
        data: nftContract.methods.requestRandomNumber().encodeABI()
    }
 
    const signedTx = await web3.eth.accounts.signTransaction(tx,ACCOUNT_PRIVATE_KEY);
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}

async function getRandomWords(){
    const randomWords = await nftContract.methods.s_randomWords([1]).call();

    console.log(`Random words is: ${randomWords}`);
}

async function getRandomNumber(){
    const randomNumber = await nftContract.methods.randomNumber().call();

    console.log(`Random number is: ${randomNumber}`);
}

getRandomNumber();