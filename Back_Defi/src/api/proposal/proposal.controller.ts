import { Request, Response, NextFunction } from 'express';
import { ProposalService } from './proposal.service';
import { Proposal } from './proposal.interface';

export class ProposalController {
  constructor(private proposalService: ProposalService) {}

  async getAllProposals(req: Request, res: Response, next: NextFunction) {
    try {
      const proposals = await this.proposalService.getAllProposals();
      return res.json(proposals);
    } catch (e) {
      next(e);
    }
  }

  async createProposal(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('test :', req.body);
      const proposal: Proposal = {
        transaction: req.body.transaction,
        title: req.body.title,
        body: req.body.body,
      };

      const newProposal = await this.proposalService.createProposal(proposal);
      return res.json(newProposal);
    } catch (e) {
      next(e);
    }
  }
}
