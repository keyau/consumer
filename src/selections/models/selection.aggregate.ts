import { AggregateRoot } from "@nestjs/cqrs";
import { IsDefined } from 'class-validator';
import { SelectionActivatedEvent } from "../events/impl/selection-activated.event";
import { ISelection } from "./selection.model.interface";

export class SelectionAggregate extends AggregateRoot implements ISelection {
  constructor(id: string, selection?: any) {
    super();
    this._id = id;
    if (selection) {
      this.accountId = selection.accountId ? selection.accountId : undefined;
    }
  }

  @IsDefined()
  _id: string;

  @IsDefined()
  accountId: string;

  add() {
    this.apply(new SelectionActivatedEvent(this._id, this));
  }
}