export class AccountAddedEvent {
  constructor(
    public id: string,
    public nbCredits: number
  ) { }

  get streamName() {
    // this is the stream name to which the event will be pushed.
    return `accounts-${this.id}`;
  }
}