import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from 'mongoose';
import { IAccount } from "./account.model.interface";

export type AccountDocument = Account & Document;

@Schema()
export class Account implements IAccount {
  constructor(id: string, account?: any) {
    this._id = id;
    if (account) {
      this.nbCredits = account.nbCredits ? account.nbCredits : undefined;
    }
  }

  @ApiProperty({
    description: 'The ID of account',
    required: true
  })
  @Prop()
  _id: string;

  @ApiProperty({
    description: 'The number of credits'
  })
  @Prop({ required: false })
  nbCredits: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);