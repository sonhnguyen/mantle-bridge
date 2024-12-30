// services.test.ts
import {
  sendEthToMantle,
  sendEthToEthereum,
} from '../../src/services/mantle-service';
import { ethers } from 'ethers';

jest.mock('ethers', () => {
  const originalModule = jest.requireActual('ethers');

  const mockJsonRpcProvider = {
    getBalance: jest.fn().mockResolvedValue(BigInt('1000000000000000000')), // Mock balance of 1 eth
  };

  const mockWallet = {
    sendTransaction: jest.fn().mockResolvedValue({
      hash: 'mock-txid',
      wait: jest.fn(),
    }),
  };

  const mockContract = {
    depositETHTo: jest.fn().mockResolvedValue({
      hash: 'mock-txid',
      wait: jest.fn(),
    }),
  };

  return {
    ...originalModule,
    ethers: {
      ...originalModule.ethers,
      isAddress: jest.fn(originalModule.ethers.isAddress),
      JsonRpcProvider: jest.fn(() => mockJsonRpcProvider),
      parseEther: jest.fn(originalModule.ethers.parseEther),
      Wallet: jest.fn(() => mockWallet),
      Contract: jest.fn(() => mockContract),
    },
  };
});

describe('Mantle Service', () => {
  it('should send ETH to Mantle successfully', async () => {
    const txid = await sendEthToMantle(
      '0x612A402eB50986832aF52f9D57dF49e17d5047B9',
      0.01
    );
    expect(txid).toBe('mock-txid');
  });

  it('should send ETH to Ethereum successfully', async () => {
    const txid = await sendEthToEthereum(
      '0x612A402eB50986832aF52f9D57dF49e17d5047B9',
      0.1
    );
    expect(txid).toBe('mock-txid');
  });
  it('should throw error for invalid amount', async () => {
    await expect(
      sendEthToMantle('0x612A402eB50986832aF52f9D57dF49e17d5047B9', 0)
    ).rejects.toThrow('Amount must be a positive number');
  });

  it('should throw error for invalid Ethereum address', async () => {
    await expect(sendEthToMantle('invalid-address', 0.1)).rejects.toThrow(
      'Invalid Ethereum address'
    );
  });

  it('should throw error for insufficient balance', async () => {
    const mockProvider = new ethers.JsonRpcProvider();
    (mockProvider.getBalance as jest.Mock).mockResolvedValueOnce(0);
    await expect(
      sendEthToMantle('0x612A402eB50986832aF52f9D57dF49e17d5047B9', 0.1)
    ).rejects.toThrow('Insufficient balance on bridge wallet');
  });
});
