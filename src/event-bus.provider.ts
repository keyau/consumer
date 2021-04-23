import { AccountAddedEvent } from './accounts/events/impl/account-added.event';
import { EventStoreBusConfig, EventStoreSubscriptionType } from './event-store/eventstore-cqrs/index';
import { SelectionActivatedEvent } from './selections/events/impl/selection-activated.event';

export const AccountEventInstantiators = {
  AccountAddedEvent: (_id, nbCredits) =>
    new AccountAddedEvent(_id, nbCredits)
};

export const SelectionEventInstantiators = {
  SelectionActivatedEvent: (_id, data) =>
    new SelectionActivatedEvent(_id, data)
};

export const eventStoreBusConfig: EventStoreBusConfig = {
  subscriptions: [
    {
      type: EventStoreSubscriptionType.Persistent,
      stream: '$ce-accounts',
      persistentSubscriptionName: 'account',
    },
    {
      type: EventStoreSubscriptionType.Persistent,
      stream: '$ce-selections',
      persistentSubscriptionName: 'selection',
    }
  ],
  eventInstantiators: {
    ...AccountEventInstantiators,
    ...SelectionEventInstantiators
  },
};