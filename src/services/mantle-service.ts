import dotenv from 'dotenv';
dotenv.config();

import { ethers } from 'ethers';
import ethBridgeABI from './abi/ethBridgeABI';
import logger from '../logger';

const ETH_RPC = process.env.ETH_RPC || 'https://eth-sepolia.public.blastapi.io';
const bridgeWalletPK = process.env.BRIDGE_WALLET_PRIVATE_KEY as string;

const ethProvider = new ethers.JsonRpcProvider(ETH_RPC);

const ethSigner = new ethers.Wallet(bridgeWalletPK, ethProvider);

const ethBridgeContractAddress =
  process.env.BRIDGE_CONTRACT_ETH ||
  '0x21F308067241B2028503c07bd7cB3751FFab0Fb2'; // default to testnet eth bridge

const bridgeContract = new ethers.Contract(
  ethBridgeContractAddress,
  ethBridgeABI,
  ethSigner
);

export async function sendEthToMantle(
  to: string,
  amount: ethers.BigNumberish
): Promise<string> {
  try {
    // Validate Ethereum address
    if (!ethers.isAddress(to)) {
      throw new Error('Invalid Ethereum address');
    }

    // Validate amount is a positive float
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Amount must be a positive number');
    }

    // Check if the wallet has enough balance
    const balance = await ethProvider.getBalance(ethSigner.address);
    const amountInWei = ethers.parseEther(amount.toString());

    if (balance < amountInWei) {
      throw new Error('Insufficient balance on bridge wallet');
    }

    // Proceed with the transaction
    const tx = await bridgeContract.depositETHTo(to, 200000, '0x', {
      value: amountInWei,
    });

    logger.info('sendEthToMantle', {
      to,
      amount,
      txid: tx.hash,
    });

    await tx.wait();

    return tx.hash;
  } catch (error) {
    const err = error as any;
    logger.error('Error sending ETH to Mantle', {
      code: err.code,
      message: err.shortMessage || err.message,
    });
    throw new Error(err.shortMessage || err.message);
  }
}

export async function sendEthToEthereum(to: string, amount: ethers.BigNumberish): Promise<string> {
  try {
    // Validate Ethereum address
    if (!ethers.isAddress(to)) {
      throw new Error('Invalid Ethereum address');
    }

    // Validate amount is a positive float
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Amount must be a positive number');
    }

    // Check if the wallet has enough balance
    const balance = await ethProvider.getBalance(ethSigner.address);
    const amountInWei = ethers.parseEther(amount.toString());

    if (balance < amountInWei) {
      throw new Error('Insufficient balance on bridge wallet');
    }

    const tx = await ethSigner.sendTransaction({
      to,
      value: amountInWei,
    });

    logger.info('sendEthToEthereum', {
      to,
      amount,
      txid: tx.hash,
    });

    await tx.wait();

    return tx.hash;
  } catch (error) {
    const err = error as any;
    logger.error('Error sending ETH to Ethereum', {
      code: err.code,
      message: err.shortMessage || err.message,
    });
    throw new Error(err.shortMessage || err.message);
  }
}
