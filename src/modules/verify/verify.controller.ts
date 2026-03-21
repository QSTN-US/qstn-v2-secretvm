import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { VerifyService } from './verify.service'
import { VerifyRequestDto, VerifyResponseDto } from './dto/verify.dto'
import { TokenGuard } from '../../common/guards/token.guard'

@Controller('verify')
@UseGuards(TokenGuard)
export class VerifyController {
  constructor(private readonly verifyService: VerifyService) {}

  @Post()
  async verify(@Body() dto: VerifyRequestDto): Promise<VerifyResponseDto> {
    return this.verifyService.verify(dto)
  }
}
