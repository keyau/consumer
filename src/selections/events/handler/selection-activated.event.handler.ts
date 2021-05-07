import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { SelectionRepository } from "../../repositories/selection.repository";
import { SelectionActivatedEvent } from "../impl/selection-activated.event";

@EventsHandler(SelectionActivatedEvent)
export class ActivateSelectionEventHandler implements IEventHandler<SelectionActivatedEvent> {
  private logger = new Logger('ActivateSelectionEventHandler');

  constructor(private repository: SelectionRepository) {}
  async handle(event: SelectionActivatedEvent) {
    this.logger.verbose(`EVENT TRIGGERED: ${event.constructor.name}}`);
    const { id, accountId } = event;
    try {
      await this.repository.create({ _id: id, accountId: accountId });
    } catch (error) {
      this.logger.error(`Failed to create selection of id ${id}`);
      this.logger.log(error.message);
      this.logger.debug(error.stack);
    }
  }
}