import { Logger } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { EventStoreRepository } from "../../../event-store/eventstore-cqrs";
import { AccountAggregate } from "../../models/account.aggregate";
import { ConsumeCreditCommand } from "../impl/consume-credit.command";

@CommandHandler(ConsumeCreditCommand)
export class ConsumeCreditCommandHandler
  implements ICommandHandler<ConsumeCreditCommand> {
  private logger: Logger;
  constructor(
    private readonly repository: EventStoreRepository,
    private readonly publisher: EventPublisher) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(command: ConsumeCreditCommand): Promise<void> {
    this.logger.log('COMMAND TRIGGERED: ConsumeCreditCommandHandler...');

    let accountAggregate =  await this.repository.loadAggregate(AccountAggregate, AccountAggregate.streamNameRoot, command.accountId);
    
    accountAggregate = this.publisher.mergeObjectContext(
      accountAggregate
    );
    accountAggregate.consumeCredit(command.selectionId);
    accountAggregate.commit();    
  }
}