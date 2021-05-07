export class CreditConsumedEvent {
  constructor(
    public accountId: string,
    public selectionId: string
  ) { }

  get streamName() {
    // this is the stream name to which the event will be pushed.
    return `accounts-${this.accountId}`;
  }
}