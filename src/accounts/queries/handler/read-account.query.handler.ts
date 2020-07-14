import { QueryHandler, IQuery, IQueryHandler } from "@nestjs/cqrs";
import { ReadAccountQuery } from "../impl/read-account.query";
import { Logger } from "@nestjs/common";
import { AccountRepository } from "../../repositories/account.repository";
import { Account } from 'src/accounts/models/account.model';

@QueryHandler(ReadAccountQuery)
export class ReadAccountHandler implements IQueryHandler<ReadAccountQuery> {
  private logger: Logger;
  constructor(private repository: AccountRepository) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(query: ReadAccountQuery): Promise<Account> {
    this.logger.log('Async ReadHandler...');

    const { id } = query;
    try {
      return await this.repository.findById(id);
    } catch (error) {
      this.logger.error(`Failed to read account of id ${id}`);
      this.logger.log(error.message);
      this.logger.debug(error.stack);
      throw error;
    }
  }
}