import { ProposalList } from '../../models/proposalList.model';
import { Proposal } from './proposal.interface';

export class ProposalRepository {
  async findAllProposal(): Promise<ProposalList[] | null> {
    try {
      return await ProposalList.findAll();
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async createProposal(proposal: Proposal): Promise<ProposalList | null> {
    try {
      return await ProposalList.create({
        transaction: proposal.transaction,
        title: proposal.title,
        body: proposal.body,
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
