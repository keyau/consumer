import { ApiProperty } from "@nestjs/swagger";

export class ActivateSelectionDto {
  constructor(selection?: any) {
    if (selection) {
      this.accountId = selection.accountId;
    }
  }
  @ApiProperty({
    description: 'The account id'
  })
  accountId: string;
}