import express, { Request, Response, NextFunction } from 'express';
import { proposalController } from './proposal.module';

export const router = express.Router();

router.get('/getlist', (req: Request, res: Response, next: NextFunction) =>
  proposalController.getAllProposals(req, res, next),
);

router.post('/create', (req: Request, res: Response, next: NextFunction) =>
  proposalController.createProposal(req, res, next),
);

export default router;
