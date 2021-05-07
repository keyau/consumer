import { Injectable } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ConsumeCreditCommand } from "../../accounts/commands/impl/consume-credit.command";
import { SelectionActivatedEvent } from "../events/impl/selection-activated.event";

@Injectable()
export class SelectionsSagas {
  @Saga()
  selectionActivated = (events$: Observable<any>): Observable<ICommand> => {
    return events$
      .pipe(
        ofType(SelectionActivatedEvent),
        map(event => {
          console.log('SAGA TRIGGERED: SelectionActivatedEvent => ConsumeCreditCommand');
          return new ConsumeCreditCommand(event.accountId, event.id);
        }),
      );
  }
}