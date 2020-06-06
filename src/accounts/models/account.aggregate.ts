import { AggregateRoot } from "@nestjs/cqrs";
import { IAccount } from "./account.model.interface";
import { IsDefined } from 'class-validator';
import { AccountAddedEvent } from "../events/impl/account-added.event";

export class AccountAggregate extends AggregateRoot implements IAccount {
  constructor(id: string, account?: any) {
    super();
    this._id = id;
    if (account) {
      this.nbCredits = account.nbCredits ? account.nbCredits : undefined;
    }
  }

  @IsDefined()
  _id: string;

  @IsDefined()
  nbCredits: number;

  add() {
    this.apply(new AccountAddedEvent(this._id, this));
  }
}