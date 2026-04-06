import { Injectable, Logger } from '@nestjs/common'
import { VerifyRequestDto, VerifyResponseDto } from './dto/verify.dto'
import { ViemService } from '../../providers/viem/viem.service'

@Injectable()
export class VerifyService {
  private readonly logger = new Logger(VerifyService.name)

  constructor(private readonly viemService: ViemService) {}

  async verify(dto: VerifyRequestDto): Promise<VerifyResponseDto> {
    this.logger.log(
      `Verify request: user=${dto.user_id} points=${dto.points} wallet=${dto.user_wallet} chain=${dto.chain_id}`,
    )

    const valid = !!dto.user_id && dto.points > 0 && !!dto.chain_id && !!dto.user_wallet

    if (!valid) {
      return {
        approved: false,
        timestamp: new Date().toISOString(),
      }
    }

    const approved = await this.viemService.verifyRewardClaim(
      {
        walletAddress: dto.user_wallet,
        amount: dto.points,
      },
      dto.chain_id,
    )

    return {
      approved,
      timestamp: new Date().toISOString(),
    }
  }
}
