import { 
  Controller, 
  Body, 
  Param,
  Get,
  Post
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiParam, ApiOkResponse } from '@nestjs/swagger';
import { CreateAccountDto } from '../dto/create-account.dto';
import { Account } from '../models/account.model';
import { AccountsService } from '../services/accounts.service';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private service: AccountsService) { }

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
    return null;
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
