import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EnvironmentDTO, EnvironmentEnum } from './config.validate'

@Injectable()
export class AppConfigService extends ConfigService<EnvironmentDTO> {
  get environment() {
    return <EnvironmentEnum>this.get('NODE_ENV')
  }

  get port(): number {
    return <number>this.get('PORT')
  }

  get interService() {
    return {
      secret: <string>this.get('INTER_SERVICE_SECRET'),
      expiresIn: <string>this.get('INTER_SERVICE_EXPIRES'),
    }
  }
}
