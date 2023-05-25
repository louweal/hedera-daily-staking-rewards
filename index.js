const {
  Client,
  AccountBalanceQuery,
  PrivateKey,
  Hbar,
  TransferTransaction,
} = require("@hashgraph/sdk");
require("dotenv").config();

// all commented code is optional

// async function getAccountBalance(stakingAccountId) {;
//   let res = await new AccountBalanceQuery()
//     .setAccountId(stakingAccountId)
//     .execute(client);
//   return parseFloat(res.hbars);
// }

const AMOUNT = 1000; // amount is in tinybar (1hbar = 100.000.000 tinybar)

// __ALWAYS__ USE WALLET THAT HOLDS A NEGLIGIBLE AMOUNT OF HBAR!!!
// 1 HBAR IS ENOUGH FOR THIS SCRIPT TO WORK FOR MANY YEARS
const myAccountId = process.env.ACCOUNT_ID;
// STORING A PRIVATE KEY IN A SCRIPT ALWAYS INVOLVES RISKS!!
const myPrivateKey = process.env.PRIVATE_KEY;

if (myAccountId == null || myPrivateKey == null) {
  throw new Error(
    "Environment variables ACCOUNT_ID and PRIVATE_KEY must be present in .env file"
  );
}

const client = Client.forMainnet().setOperator(myAccountId, myPrivateKey);

async function main(stakingAccountId) {
  // Grab command arguments
  // const stakingAccountId = process.argv[2];
  // const previousBalance = await getAccountBalance(stakingAccountId);

  // console.log(previousBalance);

  // return;
  //Create the transfer transaction
  const transaction = new TransferTransaction()
    .addHbarTransfer(myAccountId, Hbar.fromTinybars(-1 * AMOUNT))
    .addHbarTransfer(stakingAccountId, Hbar.fromTinybars(AMOUNT))
    .freezeWith(client);
  const signTx = await transaction.sign(PrivateKey.fromString(myPrivateKey));
  const txResponse = await signTx.execute(client);

  // const transactionReceipt = await txResponse.getReceipt(client);
  // console.log("Transaction status: " + transactionReceipt.status.toString());

  // const newBalance = await getAccountBalance(stakingAccountId);
  // const difference = newBalance - previousBalance;

  // console.log(stakingAccountId + " now has " + newBalance + " hbar");
  // console.log("Rewards claimed: " + difference + " hbar");
}

exports.handler = async function () {
  await main(process.env.STAKING_WALLET_ACCOUNT_ID);
};
