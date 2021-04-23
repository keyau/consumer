import { Injectable, Logger } from '@nestjs/common';
import { AggregateRoot, IEvent } from '@nestjs/cqrs';
import { ResolvedEvent } from 'node-eventstore-client';
import { EventStoreBusConfig } from '.';
import { EventStore } from '../event-store.class';
import { IEventConstructors } from '../shared/event-constructors.interface';
import { Type } from '../shared/type';

@Injectable()
export class EventStoreRepository {
  private eventHandlers: IEventConstructors;
  private logger = new Logger('EventStoreRepository');

  constructor(
    private readonly eventStore: EventStore,
    config: EventStoreBusConfig,
  ) { 
    this.addEventHandlers(config.eventInstantiators);
  }

  async loadAggregate<T extends AggregateRoot>(
    type: Type<T>,
    aggregateName: string,
    aggregateId: string,): Promise<T | null> {
      
    const stream = aggregateName + '-' + aggregateId;

    var aggregateEvents = (await this.eventStore.connection.readStreamEventsBackward(stream, 0, 10, true))
      .events
      .map(
        event => this.getEventFromPayload(event)
      );

    if (!aggregateEvents || aggregateEvents.length === 0) {
      return null;
    }

    const aggregate = new type(aggregateId);

    aggregate.loadFromHistory(aggregateEvents);

    return aggregate;
  }

  private getEventFromPayload(payload: ResolvedEvent): IEvent {
    const { event } = payload;
    //this.logger.verbose(`Payload ${JSON.stringify(payload)}`);
    if ((payload.link !== null && !payload.isResolved) || !event || !event.isJson) {
      this.logger.error('Received event that could not be resolved!');
      return;
    }

    const data = Object.values(JSON.parse(event.data.toString()));
    const eventDeserialized = this.eventHandlers[event.eventType](...data);
    return eventDeserialized;
  }

  private addEventHandlers(eventHandlers: IEventConstructors) {
    this.eventHandlers = { ...this.eventHandlers, ...eventHandlers };
  }
}