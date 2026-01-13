import { TokenValueRepository } from './TokenValueHistory.repository';

export class TokenValueService {
  constructor(private tokenValueRepository: TokenValueRepository) {}

  async findByTokenName(name: string) {
    try {
      return await this.tokenValueRepository.findAllTokenValue(name);
    } catch (e) {
      console.log(e);
    }
  }

  async findByTokenNameAndDate(name: string, date: string) {
    try {
      return await this.tokenValueRepository.findTokenValueByDate(name, date);
    } catch (e) {
      console.log(e);
    }
  }

  async findYesterdayTokenValue(name: string) {
    try {
      return await this.tokenValueRepository.findYesterdayTokenValue(name);
    } catch (e) {
      console.log(e);
    }
  }

  async findTodayTokenValue(name: string) {
    try {
      return await this.tokenValueRepository.findTodayTokenValue(name);
    } catch (e) {
      console.log(e);
    }
  }
  async calculatePriceChangePercentage(name: string) {
    try {
      return await this.tokenValueRepository.calculatePriceChangePercentage(
        name,
      );
    } catch (e) {
      console.log(e);
    }
  }
}
