import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AccountsController } from './controllers/accounts.controller';
import { Account } from './models/account.model';

@Module({
  imports: [TypegooseModule.forFeature([Account])],
  controllers: [AccountsController]
})
export class AccountsModule {}
