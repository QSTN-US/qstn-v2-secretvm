import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppConfigService } from './config/config.service'
import { validate } from './config/config.validate'
import { TokenModule } from '../providers/jwt/token.module'
import { TokenGuard } from '../common/guards/token.guard'

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, cache: true, validate }), TokenModule],
  providers: [AppConfigService, TokenGuard],
  exports: [AppConfigService, TokenModule, TokenGuard],
})
export class CoreModule {}
