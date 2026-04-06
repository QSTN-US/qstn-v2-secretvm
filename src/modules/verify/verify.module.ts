import { Module } from '@nestjs/common'
import { ViemModule } from 'src/providers/viem/viem.module'
import { VerifyController } from './verify.controller'
import { VerifyService } from './verify.service'

@Module({
  imports: [ViemModule],
  controllers: [VerifyController],
  providers: [VerifyService],
})
export class VerifyModule {}
