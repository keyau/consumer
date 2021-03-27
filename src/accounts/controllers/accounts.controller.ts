import {
  Body, Controller,


  Get, Param,

  Post
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from '../dto/create-account.dto';
import { Account } from '../models/account.model';
import { AccountsService } from '../services/accounts.service';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private service: AccountsService) { }

  @Get()
  @ApiOkResponse({
    description: 'The list of account',
    type: [Account]
  })
  async readAll(): Promise<Account[]> {
    return this.service.readAll();
  }

  @Get('/:id')
  @ApiParam({
    name: 'id',
    description: 'The ID of account'
  })
  @ApiOkResponse({
    description: 'The account',
    type: Account
  })
  async read(
    @Param('id') id: string,
  ): Promise<Account> {
    return this.service.read(id);
  }
  
  @Post()
  @ApiCreatedResponse({
    description: 'The account has been successfully created.',
    type: Account
  })
  async add(
    @Body() object: CreateAccountDto
  ): Promise<Account> {
    return this.service.add(object);
  }
}
