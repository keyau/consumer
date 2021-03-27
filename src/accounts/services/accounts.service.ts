import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { Guid } from '../../tools/guid';
import { AddAccountCommand } from '../commands/impl/add-account.command';
import { CreateAccountDto } from '../dto/create-account.dto';
import { Account } from '../models/account.model';
import { ReadAccountQuery } from '../queries/impl/read-account.query';
import { ReadAccountsQuery } from '../queries/impl/read-accounts.query';

@Injectable()
export class AccountsService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {
  }
  
  protected async executeCommand(command: ICommand): Promise<void> {
    return await this.commandBus.execute(command);
  }

  protected async executeQuery(query: IQuery): Promise<any> {
    return await this.queryBus.execute(query);
  }

  async readAll(): Promise<Account[]> {
    return await this.executeQuery(new ReadAccountsQuery());
  }

  async read(id: string): Promise<Account> {
    return await this.executeQuery(new ReadAccountQuery(id));
  }

  async add(object: CreateAccountDto): Promise<Account> {
    const account: Account = new Account(Guid.createUuid(), object);
    await this.executeCommand(new AddAccountCommand(account));
    return account;
  }
}
