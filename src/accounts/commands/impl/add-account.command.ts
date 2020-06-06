import { ICommand } from "@nestjs/cqrs";
import { IAccount } from "src/accounts/models/account.model.interface";

export class AddAccountCommand implements ICommand {
  constructor(
    public readonly account: IAccount
  ) {}
}