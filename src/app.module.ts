import { Module } from '@nestjs/common'
import { CoreModule } from './core/core.module'
import { VerifyModule } from './modules/verify/verify.module'

@Module({
  imports: [CoreModule, VerifyModule],
})
export class AppModule {}
