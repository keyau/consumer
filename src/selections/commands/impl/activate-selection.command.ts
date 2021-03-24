import { ICommand } from "@nestjs/cqrs";
import { ISelection } from "../../models/selection.model.interface";

export class ActivateSelectionCommand implements ICommand {
  constructor(
    public readonly selection: ISelection
  ) {}
}