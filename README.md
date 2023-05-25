# Hedera native staking rewards collection tool

## How does it work?

This script sends some tinybars to your Hedera native staking wallet using the Hedera Javascript SDK. This triggers the collection of pending staking rewards. Follow the instructions below to upload the script to a Cloud service (AWS) that runs the script once every 24 hours.

For more information about compunding Hedera native staking rewards, see my blog post: [https://dev.to/louweal/how-to-increase-your-hedera-staking-rewards-with-02-59ah](https://dev.to/louweal/how-to-increase-your-hedera-staking-rewards-with-02-59ah)

## What do you need?

You need to have staked your hbar using Hedera native staking. For more information see: [https://www.hashpack.app/post/hedera-staking-rewards-faq-hashpack-web3-wallet](https://www.hashpack.app/post/hedera-staking-rewards-faq-hashpack-web3-wallet)

You also need to be familiar with `npm` (or another javascript package manager).

## Step 1

Create a new software wallet, for example using Hashpack. Copy your private key. Transfer 1 HBAR to your new wallet.
**NEVER use a wallet for this script that contains more than a negligible amount of hbar, since you will need to add the private key of this wallet to the script and upload it to Amazon AWS!**

## Step 2

Download this repository to your computer and install the dependencies using npm:

```
npm install
```

This project was tested using node version 16.13.

## Step 3

Create an .env file in the root directory and add the following variables:

```
STAKING_WALLET_ACCOUNT_ID=0.0.xxxx
ACCOUNT_ID=0.0.xxx
PRIVATE_KEY=xxxxx
```

Fill in your Account IDs and the private key you copied from your new software wallet.

**NEVER put in the private key of your staking wallet, or any other private key that belongs to a wallet that contains more than a few hbar!**

Save your changes.

## Step 4

Add the **contents** of your local repository to a .zip archive file. Make sure that you only archive the contents and not the folder itself.

## Step 5

Sign up or log in to [Amazon Web Services (AWS)](https://aws.amazon.com). Signing up to AWS is free, but requires your creditcard details. In my experience, you will not be billed until you have used a very huge amount of AWS' resources, which isn't very likely to happen when you only run a simple script like this only once a day.

After logging in, find the AWS Lambda service. You can use the search bar on the top of the screen to find services. Create a new lambda function by clicking 'Create function'.

## Step 6

Give your Lambda function a name. Keep all default settings and click 'Create function' once more to continue.

## Step 7

Click 'Upload from' and upload your .zip file.

## Step 8

Go to the 'Configuration' tab. Click 'General configuration' in the lefthand menu and click the 'Edit' button. Change the timeout to '5 minutes and 0 seconds' and click 'Save'.

## Step 9

Go to the 'Test' tab. Insert a random name for your test function and click 'Test'. Make sure that the test ran succesfully, that the logs are as expected and that you have received 1000 tinybar and your pending staking rewards (if you had any rewards pending) on your staking account.

## Step 10

Go to the 'Configuration' tab. Click 'Triggers' in the lefthand menu and click 'Add trigger'.

## Step 11

Select 'Cloudbridge (CloudWatch Events)' as source for your trigger. Next, toggle 'Create new rule'. Enter a rule name and a rule description that describe your trigger.
Next, add the following expression to the 'Schedule expression' field:

```
cron(0 17 * * ? *)
```

This expression runs the script daily at 5pm UTC. Change the second number (17) if you want to run the script at a different hour.
Finally, click 'Add' and you're all set!
