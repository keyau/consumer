import { AccountAddedEvent } from "../accounts/events/impl/account-added.event";
import { CreditConsumedEvent } from "../accounts/events/impl/credit-consumed.event";
import { SelectionActivatedEvent } from "../selections/events/impl/selection-activated.event";
import { IEventConstructors } from "./shared/event-constructors.interface";

export const AccountEventInstantiators = {
  AccountAddedEvent: (id, nbCredits) =>
    new AccountAddedEvent(id, nbCredits),
  CreditConsumedEvent: (id, accountId) => 
    new CreditConsumedEvent(id, accountId)
};

export const SelectionEventInstantiators = {
  SelectionActivatedEvent: (_id, data) =>
    new SelectionActivatedEvent(_id, data)
};

export const EventInstantiators : IEventConstructors = {
  ...AccountEventInstantiators,
  ...SelectionEventInstantiators
};