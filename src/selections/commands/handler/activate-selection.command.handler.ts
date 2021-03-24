import { Logger } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Account } from "../../../accounts/models/account.model";
import { AccountRepository } from "../../../accounts/repositories/account.repository";
import { SelectionAggregate } from "../../../selections/models/selection.aggregate";
import { ActivateSelectionCommand } from "../impl/activate-selection.command";

@CommandHandler(ActivateSelectionCommand)
export class ActivateSelectionCommandHandler
  implements ICommandHandler<ActivateSelectionCommand> {
  private logger: Logger;
  constructor(
    private readonly publisher: EventPublisher, 
    private readonly accountRepository: AccountRepository) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(command: ActivateSelectionCommand): Promise<void> {
    this.logger.log('COMMAND TRIGGERED: ActivateSelectionCommandHandler...');

    const { selection } = command;
    
    let account: Account = await this.accountRepository.findById(selection.accountId);
    
    const selectionAggregate = this.publisher.mergeObjectContext(
      new SelectionAggregate(selection._id, selection),
    );
    selectionAggregate.add();
    selectionAggregate.commit();
  }
}