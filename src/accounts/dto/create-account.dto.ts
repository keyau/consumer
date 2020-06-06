import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountDto {
  constructor(account?: any) {
    if (account) {
      this.nbCredits = account.nbCredits;
    }
  }
  @ApiProperty({
    description: 'The number of credits'
  })
  nbCredits: number;
}