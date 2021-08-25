import { AggregateRoot } from "@nestjs/cqrs";
import { IsDefined } from 'class-validator';
import { AccountAddedEvent } from "../events/impl/account-added.event";
import { CreditConsumedEvent } from "../events/impl/credit-consumed.event";
import { IAccount } from "./account.model.interface";

export class AccountAggregate extends AggregateRoot implements IAccount {

  static readonly streamNameRoot = 'accounts';
  
  constructor(id: string, nbCredits: number) {
    super();
    this._id = id;
    this.nbCredits = nbCredits;
    this.selections = new Array<string>();
  }

  @IsDefined()
  _id: string;

  @IsDefined()
  nbCredits: number;

  @IsDefined()
  nbCreditsConsumed: number;

  @IsDefined()
  selections: Array<string>;

  add() {
    this.apply(new AccountAddedEvent(this._id, this.nbCredits));
  }

  tryConsumeCredit(selectionId: string){
    if (!this.selections.includes(selectionId))
    {
      this.apply(new CreditConsumedEvent(this._id, selectionId));
      return true;
    }
    return false;
  }

  onAccountAddedEvent(event: AccountAddedEvent){
    this._id = event.id;
    this.nbCredits = event.nbCredits;
    this.selections = new Array<string>();
  }

  onCreditConsumedEvent(event: CreditConsumedEvent){ // eslint-disable-line
    this.nbCreditsConsumed += 1;
    this.selections.push(event.selectionId);
  }
}