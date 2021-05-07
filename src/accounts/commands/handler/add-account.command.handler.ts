import { Logger } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AccountAggregate } from "../../models/account.aggregate";
import { AddAccountCommand } from "../impl/add-account.command";

@CommandHandler(AddAccountCommand)
export class AddAccountCommandHandler
  implements ICommandHandler<AddAccountCommand> {
  private logger: Logger;
  constructor(private readonly publisher: EventPublisher) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(command: AddAccountCommand): Promise<void> {
    this.logger.log('COMMAND TRIGGERED: AddAccountCommandHandler...');

    const accountAggregate = this.publisher.mergeObjectContext(
      new AccountAggregate(command._id, command.nbCredits),
    );
    accountAggregate.add();
    accountAggregate.commit();
  }
}