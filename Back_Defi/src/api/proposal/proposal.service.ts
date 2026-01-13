import { ProposalRepository } from './proposal.repository';
import { Proposal } from './proposal.interface';

export class ProposalService {
  constructor(private proposalRepository: ProposalRepository) {}

  async getAllProposals() {
    return await this.proposalRepository.findAllProposal();
  }

  async createProposal(proposal: Proposal) {
    return await this.proposalRepository.createProposal(proposal);
  }
}
