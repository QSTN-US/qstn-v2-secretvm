import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

export class VerifyRequestDto {
  @IsString()
  @IsNotEmpty()
  user_id!: string

  @IsNumber()
  @IsNotEmpty()
  points!: number

  @IsString()
  @IsNotEmpty()
  user_wallet!: string

  @IsString()
  @IsNotEmpty()
  chain_id!: string
}

export class VerifyResponseDto {
  approved!: boolean

  timestamp!: string
}
