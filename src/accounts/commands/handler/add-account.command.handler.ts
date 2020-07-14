import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import { AddAccountCommand } from "../impl/add-account.command";
import { Logger } from "@nestjs/common";
import { AccountAggregate } from "src/accounts/models/account.aggregate";

@CommandHandler(AddAccountCommand)
export class AddAccountCommandHandler
  implements ICommandHandler<AddAccountCommand> {
  private logger: Logger;
  constructor(private readonly publisher: EventPublisher) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(command: AddAccountCommand): Promise<void> {
    this.logger.log('COMMAND TRIGGERED: AddCommandHandler...');
    const { account } = command;
    const personAggregate = this.publisher.mergeObjectContext(
      new AccountAggregate(account._id, account),
    );
    personAggregate.add();
    personAggregate.commit();
  }
}