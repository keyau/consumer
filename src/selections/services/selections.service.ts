import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, QueryBus } from '@nestjs/cqrs';
import { Guid } from '../../tools/guid';
import { ActivateSelectionCommand } from '../commands/impl/activate-selection.command';
import { ActivateSelectionDto } from '../dto/activate-selection.dto';
import { Selection } from '../models/selection.model';

@Injectable()
export class SelectionsService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {
  }
  
  protected async executeCommand(command: ICommand): Promise<void> {
    return await this.commandBus.execute(command);
  }

  async activate(object: ActivateSelectionDto): Promise<Selection> {
    let selection: Selection = new Selection(Guid.create_UUID(), object.accountId);
    await this.executeCommand(new ActivateSelectionCommand(selection));
    return selection;
  }
}
