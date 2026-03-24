import { Module } from '@nestjs/common'
import { CoreModule } from './core/core.module'
import { HealthModule } from './modules/health/health.module'
import { VerifyModule } from './modules/verify/verify.module'

@Module({
  imports: [CoreModule, HealthModule, VerifyModule],
})
export class AppModule {}
