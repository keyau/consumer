import { ICommand } from "@nestjs/cqrs";

export class ConsumeCreditCommand implements ICommand {
  constructor(
    public readonly accountId: string,
    public readonly selectionId: string
  ) {}
}