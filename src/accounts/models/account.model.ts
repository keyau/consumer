import { IAccount } from "./account.model.interface";
import { ApiProperty } from "@nestjs/swagger";
import { prop } from '@typegoose/typegoose';

export class Account implements IAccount {
  constructor(id: string, account?: any) {
    this.id = id;
    if (account) {
      this.nbCredits = account.nbCredits ? account.nbCredits : undefined;
    }
  }

  @ApiProperty({
    description: 'The ID of account',
    required: true
  })
  @prop({ required: true, unique: true })
  id: string;

  @ApiProperty({
    description: 'The number of credits'
  })
  nbCredits: number;
}