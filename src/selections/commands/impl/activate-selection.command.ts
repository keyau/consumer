import { ICommand } from "@nestjs/cqrs";

export class ActivateSelectionCommand implements ICommand {
  constructor(
    public readonly _id: string,
    public readonly accountId: string
  ) {}
}