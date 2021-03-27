import { Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Account } from 'src/accounts/models/account.model';
import { AccountRepository } from "../../repositories/account.repository";
import { ReadAccountsQuery } from "../impl/read-accounts.query";

@QueryHandler(ReadAccountsQuery)
export class ReadAccountsHandler implements IQueryHandler<ReadAccountsQuery> {
  private logger: Logger;
  constructor(private repository: AccountRepository) {
    this.logger = new Logger(this.constructor.name);
  }
 
  async execute(query: ReadAccountsQuery): Promise<Account[]> { // eslint-disable-line
    this.logger.log('Async ReadAccountsHandler...');

    try {
      return await this.repository.findAll();
    } catch (error) {
      this.logger.error(`Failed to read accounts`);
      this.logger.log(error.message);
      this.logger.debug(error.stack);
      throw error;
    }
  }
}