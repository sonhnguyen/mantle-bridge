import { RequestHandler } from 'express';
import { check, validationResult } from 'express-validator';
import { ethers } from 'ethers';
import BadRequest from '../../errors/bad-request';
import ApplicationError from '../../errors/application-error';
import { sendEthToMantle, sendEthToEthereum } from '../../services/mantle-service'; // Import the service function
import logger from '../../logger';

export const bridgeEthToMantle: RequestHandler[] = [
  // Validation middleware
  check('address', 'Invalid Ethereum address').custom((value) =>
    ethers.isAddress(value)
  ),
  check('amount', 'Amount must be a positive number').isFloat({ gt: 0 }),

  // Controller logic
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new BadRequest(
          errors
            .array()
            .map((e) => e.msg)
            .join(', ')
        )
      );
    }

    try {
      const { address, amount } = req.body;
      const txid = await sendEthToMantle(address, amount);

      res.json({
        message: 'Bridging from Ethereum to Mantle initiated',
        transactionHash: txid,
        address,
        amount,
      });
    } catch (error: any) {
      logger.error('Error sending ETH to Mantle', {
        message: error.message,
      });
      return next(
        new ApplicationError('Failed to bridge ETH to Mantle: ' + error.message)
      );
    }
  },
];

export const bridgeMantleToEth: RequestHandler[] = [
  check('address', 'Invalid Ethereum address').custom((value) =>
    ethers.isAddress(value)
  ),
  check('amount', 'Amount must be a positive number').isFloat({ gt: 0 }),

  // Controller logic
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new BadRequest(
          errors
            .array()
            .map((e) => e.msg)
            .join(', ')
        )
      );
    }

    try {
      const { address, amount } = req.body;
      const txid = await sendEthToEthereum(address, amount);

      res.json({
        message: 'Bridging from Mantle to Ethereum initiated',
        transactionHash: txid,
        address,
        amount,
      });
    } catch (error: any) {
      logger.error('Error sending ETH to Ethereum', {
        message: error.message,
      });
      return next(
        new ApplicationError('Failed to bridge ETH to Ethereum: ' + error.message)
      );
    }
  },
];
