import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TokenService } from './token.service'
import { AppConfigService } from '../../core/config/config.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        secret: configService.interService.secret || 'interservice_secret',
        signOptions: { expiresIn: configService.interService.expiresIn },
      }),
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
