import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus, ICommand, IQuery } from '@nestjs/cqrs';
import { Account } from '../models/account.model';
import { CreateAccountDto } from '../dto/create-account.dto';
import { AddAccountCommand } from '../commands/impl/add-account.command';
import { Guid } from 'src/tools/guid';
import { AccountAggregate } from '../models/account.aggregate';
import { ReadAccountQuery } from '../queries/impl/read-account.query';

@Injectable()
export class AccountsService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {
  }
  
  protected async executeCommand(command: ICommand): Promise<any> {
    if (this.commandBus instanceof CommandBus) {
      return await this.commandBus.execute(command);
    }
  }

  protected async executeQuery(query: IQuery): Promise<any> {
    if (this.queryBus instanceof QueryBus) {
      return await this.queryBus.execute(query);
    }
  }

  async read(id: string): Promise<Account> {
    return await this.executeQuery(new ReadAccountQuery(id));
  }

  async add(object: CreateAccountDto): Promise<Account> {
    let account: Account = new Account(Guid.create_UUID(), object);
    let accountCreated: AccountAggregate = await this.executeCommand(new AddAccountCommand(account));

    return new Account(accountCreated._id, accountCreated);
  }
}
