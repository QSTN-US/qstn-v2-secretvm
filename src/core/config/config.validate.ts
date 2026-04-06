import { plainToInstance } from 'class-transformer'
import { IsDefined, IsEnum, IsNumber, IsString, validateSync } from 'class-validator'

export enum EnvironmentEnum {
  PRODUCTION = 'production',
  STAGING = 'staging',
  DEVELOPMENT = 'development',
  LOCAL = 'local',
  TEST = 'test',
}

export class EnvironmentDTO {
  @IsDefined()
  @IsEnum(EnvironmentEnum)
  NODE_ENV: EnvironmentEnum = EnvironmentEnum.DEVELOPMENT

  @IsDefined()
  @IsNumber()
  PORT: number = 3000

  @IsDefined()
  @IsString()
  INTER_SERVICE_SECRET: string = 'INTER_SERVICE_SECRET'

  @IsDefined()
  @IsString()
  INTER_SERVICE_EXPIRES: string = '30s'

  @IsDefined()
  @IsString()
  POLYGON_MAINNET_ADDRESS: string = ''

  @IsDefined()
  @IsString()
  POLYGON_TESTNET_ADDRESS: string = ''
}

export const validate = (config: Record<string, unknown>): EnvironmentDTO => {
  const validatedConfig = plainToInstance(EnvironmentDTO, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validatedConfig, {
    whitelist: true,
    forbidUnknownValues: true,
    validationError: {
      target: false,
    },
  })

  if (errors.length > 0) {
    throw new Error(String(errors))
  }

  return validatedConfig
}
