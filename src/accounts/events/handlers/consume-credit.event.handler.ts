import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AccountRepository } from "../../repositories/account.repository";
import { CreditConsumedEvent } from "../impl/credit-consumed.event";

@EventsHandler(CreditConsumedEvent)
export class CreditConsumedEventHandler implements IEventHandler<CreditConsumedEvent> {
  private logger = new Logger('CreditConsumedEventHandler');

  constructor(private repository: AccountRepository) {}
  async handle(event: CreditConsumedEvent) {
    this.logger.verbose(`EVENT TRIGGERED: ${event.constructor.name}}`);
    const { accountId } = event;
    try {
      const account = await this.repository.findById(accountId);
      account.nbCredits -= 1;
      await this.repository.update(account);
    } catch (error) {
      this.logger.error(`Failed to update account of id ${accountId}`);
      this.logger.log(error.message);
      this.logger.debug(error.stack);
    }
  }
}