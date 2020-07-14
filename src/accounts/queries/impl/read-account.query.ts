import { IQuery } from '@nestjs/cqrs';

export class ReadAccountQuery implements IQuery {
  constructor(public readonly id: string) {}
}
