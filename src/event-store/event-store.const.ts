import { AccountAddedEvent } from "src/accounts/events/impl/account-added.event";
import { SelectionActivatedEvent } from "src/selections/events/impl/selection-activated.event";
import { IEventConstructors } from "./shared/event-constructors.interface";

export const AccountEventInstantiators = {
  AccountAddedEvent: (id, nbCredits) =>
    new AccountAddedEvent(id, nbCredits)
};

export const SelectionEventInstantiators = {
  SelectionActivatedEvent: (_id, data) =>
    new SelectionActivatedEvent(_id, data)
};

export const EventInstantiators : IEventConstructors = {
  ...AccountEventInstantiators,
  ...SelectionEventInstantiators
};