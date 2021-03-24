import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from 'mongoose';
import { ISelection } from "./selection.model.interface";

export type SelectionDocument = Selection & Document;

@Schema()
export class Selection implements ISelection {
  constructor(id: string, accountId: string) {
    this._id = id;
    this.accountId = accountId;
  }

  @ApiProperty({
    description: 'The ID of selection',
    required: true
  })
  @Prop()
  _id: string;

  @ApiProperty({
    description: 'The ID of account',
    required: true
  })
  @Prop()
  accountId: string;
}

export const SelectionSchema = SchemaFactory.createForClass(Selection);