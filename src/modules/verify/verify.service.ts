import { Injectable, Logger } from '@nestjs/common'
import { VerifyRequestDto, VerifyResponseDto } from './dto/verify.dto'

@Injectable()
export class VerifyService {
  private readonly logger = new Logger(VerifyService.name)

  async verify(dto: VerifyRequestDto): Promise<VerifyResponseDto> {
    this.logger.log(
      `Verify request: user=${dto.user_id} points=${dto.points} campaign=${dto.provider_id}`,
    )

    const approved = !!dto.user_id && dto.points > 0 && !!dto.provider_id

    return {
      approved,
      timestamp: new Date().toISOString(),
    }
  }
}
