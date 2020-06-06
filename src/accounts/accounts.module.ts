import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AccountsController } from './controllers/accounts.controller';
import { Account } from './models/account.model';
import { AccountsService } from './services/accounts.service';
import { AccountRepository } from './repositories/account.repository';
import { AccountCommandHandlers } from './commands/handler';
import { AccountEventHandlers } from './events/handlers';

@Module({
  imports: [TypegooseModule.forFeature([Account])],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    AccountRepository,
    ...AccountCommandHandlers,
    ...AccountEventHandlers
  ]
})
export class AccountsModule {}
