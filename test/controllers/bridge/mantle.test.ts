// controllers.test.ts
import request from 'supertest';
import app from '../../../src/app';
import { sendEthToMantle, sendEthToEthereum } from '../../../src/services/mantle-service'; // Adjust the import path

jest.mock('../../../src/services/mantle-service');

describe('Bridge ETH to Mantle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should bridge ETH to Mantle successfully', async () => {
    (sendEthToMantle as jest.Mock).mockResolvedValue('mock-txid-eth-to-mantle');

    const response = await request(app)
      .post('/bridge/eth-to-mantle')
      .send({
        address: '0x612A402eB50986832aF52f9D57dF49e17d5047B9',
        amount: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Bridging from Ethereum to Mantle initiated',
      transactionHash: 'mock-txid-eth-to-mantle',
      address: '0x612A402eB50986832aF52f9D57dF49e17d5047B9',
      amount: 1,
    });
  });

  it('should return error for invalid Ethereum address', async () => {
    const response = await request(app)
      .post('/bridge/eth-to-mantle')
      .send({ address: 'invalid-address', amount: 1 });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Invalid Ethereum address');
  });

  it('should return error for invalid amount', async () => {
    const response = await request(app)
      .post('/bridge/eth-to-mantle')
      .send({
        address: '0x612A402eB50986832aF52f9D57dF49e17d5047B9',
        amount: 0,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Amount must be a positive number');
  });
});

describe('Bridge Mantle to ETH', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should bridge ETH from Mantle to Ethereum successfully', async () => {
    (sendEthToEthereum as jest.Mock).mockResolvedValue('mock-txid-mantle-to-eth');

    const response = await request(app)
      .post('/bridge/mantle-to-eth')
      .send({
        address: '0x612A402eB50986832aF52f9D57dF49e17d5047B9',
        amount: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Bridging from Mantle to Ethereum initiated',
      transactionHash: 'mock-txid-mantle-to-eth',
      address: '0x612A402eB50986832aF52f9D57dF49e17d5047B9',
      amount: 1,
    });
  });

  it('should return error for invalid Ethereum address', async () => {
    const response = await request(app)
      .post('/bridge/mantle-to-eth')
      .send({ address: 'invalid-address', amount: 1 });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Invalid Ethereum address');
  });

  it('should return error for invalid amount', async () => {
    const response = await request(app)
      .post('/bridge/mantle-to-eth')
      .send({
        address: '0x612A402eB50986832aF52f9D57dF49e17d5047B9',
        amount: 0,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Amount must be a positive number');
  });
});
