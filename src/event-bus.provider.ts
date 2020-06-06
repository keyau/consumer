import { EventStoreBusConfig, EventStoreSubscriptionType } from './event-store/eventstore-cqrs/index';
import { AccountAddedEvent } from './accounts/events/impl/account-added.event';

export const AccountEventInstantiators = {
  AccountAddedEvent: (_id, data) =>
    new AccountAddedEvent(_id, data)
};

export const eventStoreBusConfig: EventStoreBusConfig = {
  subscriptions: [
    {
      type: EventStoreSubscriptionType.Persistent,
      stream: '$ce-accounts',
      persistentSubscriptionName: 'account',
    }
  ],
  eventInstantiators: {
    ...AccountEventInstantiators
  },
};