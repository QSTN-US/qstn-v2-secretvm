import { Module } from '@nestjs/common'
import { ViemService } from './viem.service'

@Module({
  imports: [],
  providers: [ViemService],
  controllers: [],
  exports: [ViemService],
})
export class ViemModule {}
