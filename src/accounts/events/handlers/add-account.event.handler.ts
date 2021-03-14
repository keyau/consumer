import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AccountAddedEvent } from "../impl/account-added.event";
import { Logger } from "@nestjs/common";
import { AccountRepository } from "../../repositories/account.repository";

@EventsHandler(AccountAddedEvent)
export class AddAccountEventHandler implements IEventHandler<AccountAddedEvent> {
  private logger = new Logger('AddEventHandler');

  constructor(private repository: AccountRepository) {}
  async handle(event: AccountAddedEvent) {
    this.logger.verbose(`EVENT TRIGGERED: ${event.constructor.name}}`);
    const { id, data } = event;
    try {
      await this.repository.create(data);
    } catch (error) {
      this.logger.error(`Failed to create account of id ${id}`);
      this.logger.log(error.message);
      this.logger.debug(error.stack);
    }
  }
}