import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { TokenService } from '../../providers/jwt/token.service'
import { HEADER_AUTHORIZATION } from '../constants/headers'

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or malformed authorization token')
    }

    const jwtToken = request.headers[HEADER_AUTHORIZATION]?.split(' ').pop()

    try {
      request.service = this.tokenService.verifyToken(jwtToken)

      return true
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token')
    }
  }
}
