import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountCommandHandlers } from './commands/handler';
import { AccountsController } from './controllers/accounts.controller';
import { AccountEventHandlers } from './events/handlers';
import { Account, AccountSchema } from './models/account.model';
import { AccountQueryHandlers } from './queries/handler';
import { AccountRepository } from './repositories/account.repository';
import { AccountsService } from './services/accounts.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }])],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    AccountRepository,
    ...AccountCommandHandlers,
    ...AccountEventHandlers,
    ...AccountQueryHandlers,
  ]
})
export class AccountsModule {}
