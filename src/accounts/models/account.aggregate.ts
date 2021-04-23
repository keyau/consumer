import { AggregateRoot } from "@nestjs/cqrs";
import { IsDefined } from 'class-validator';
import { AccountAddedEvent } from "../events/impl/account-added.event";
import { IAccount } from "./account.model.interface";

export class AccountAggregate extends AggregateRoot implements IAccount {
  constructor(id: string, nbCredits: number) {
    super();
    this._id = id;
    this.nbCredits = nbCredits;
  }

  @IsDefined()
  _id: string;

  @IsDefined()
  nbCredits: number;

  @IsDefined()
  nbCreditsConsumed: number;

  add() {
    this.apply(new AccountAddedEvent(this._id, this.nbCredits));
  }

  onAccountAddedEvent(event: AccountAddedEvent){
    this._id = event.id;
    this.nbCredits = event.nbCredits;
  }
}