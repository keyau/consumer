export class SelectionActivatedEvent {
  constructor(
    public id: string,
    public data: any
  ) { }

  get streamName() {
    // this is the stream name to which the event will be pushed.
    return `selections-${this.id}`;
  }
}