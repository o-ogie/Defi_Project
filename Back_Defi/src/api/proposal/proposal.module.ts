import { ProposalList } from '../../models/proposalList.model';
import { ProposalRepository } from './proposal.repository';
import { ProposalService } from './proposal.service';
import { ProposalController } from './proposal.controller';

const proposalRepository = new ProposalRepository();
const proposalService = new ProposalService(proposalRepository);
const proposalController = new ProposalController(proposalService);

export { proposalController };
