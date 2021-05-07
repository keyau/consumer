import { ICommand } from "@nestjs/cqrs";

export class AddAccountCommand implements ICommand {
  constructor(
    public readonly _id: string,
    public readonly nbCredits: number
  ) {}
}