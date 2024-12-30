import { Router } from 'express';
import {
  bridgeEthToMantle,
  bridgeMantleToEth,
} from './controllers/bridge/mantle';

const router = Router();

router.post('/bridge/eth-to-mantle', bridgeEthToMantle);
router.post('/bridge/mantle-to-eth', bridgeMantleToEth);

export default router;
