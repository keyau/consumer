import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from 'mongoose';
import { IAccount } from "./account.model.interface";

export type AccountDocument = Account & Document;

@Schema()
export class Account implements IAccount {
  constructor(id: string, nbCredits: number) {
    this._id = id;
    this.nbCredits = nbCredits;
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