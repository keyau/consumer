import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '../accounts/models/account.model';
import { AccountRepository } from '../accounts/repositories/account.repository';
import { SelectionCommandHandlers } from './commands/handler';
import { SelectionsController } from './controllers/selections.controller';
import { SelectionEventHandlers } from './events/handler';
import { Selection, SelectionSchema } from './models/selection.model';
import { SelectionRepository } from './repositories/selection.repository';
import { SelectionsSagas } from './sagas/selections.sagas';
import { SelectionsService } from './services/selections.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Selection.name, schema: SelectionSchema }, 
    { name: Account.name, schema: AccountSchema }])],
  controllers: [SelectionsController],
  providers: [
    SelectionsService,
    SelectionRepository,
    AccountRepository,
    SelectionsSagas,
    ...SelectionCommandHandlers,
    ...SelectionEventHandlers,
  ]
})
export class SelectionsModule {}
