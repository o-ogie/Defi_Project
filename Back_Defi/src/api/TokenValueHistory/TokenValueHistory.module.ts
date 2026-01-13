import { TokenValue } from '../../models/tokenValue.model';
import { TokenValueRepository } from './TokenValueHistory.repository';
import { TokenValueService } from './TokenValueHistory.service';
import { TokenValueController } from './TokenValueHistory.controller';

const tokenValueRepository = new TokenValueRepository();
const tokenValueService = new TokenValueService(tokenValueRepository);
const tokenValueController = new TokenValueController(tokenValueService);

export { tokenValueController };
