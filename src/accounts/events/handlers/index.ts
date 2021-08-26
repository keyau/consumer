import { AddAccountEventHandler } from "./add-account.event.handler";
import { CreditConsumedEventHandler } from "./consume-credit.event.handler";

export const AccountEventHandlers = [
  AddAccountEventHandler,
  CreditConsumedEventHandler
];