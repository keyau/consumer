import { EventInstantiators } from './event-store/event-store.const';
import { EventStoreBusConfig, EventStoreSubscriptionType } from './event-store/eventstore-cqrs/index';

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
  eventInstantiators: EventInstantiators,
};