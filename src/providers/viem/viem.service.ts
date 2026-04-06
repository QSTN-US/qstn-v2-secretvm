/* eslint-disable import/no-extraneous-dependencies */
import { Injectable, Logger } from '@nestjs/common'
import { Chain, createPublicClient, getContract, http } from 'viem'
import { polygon, polygonAmoy } from 'viem/chains'
import { AppConfigService } from '../../core/config/config.service'
import { polReward } from './abis/polReward'
import { WalletChainIdEnum } from './viem.type'

@Injectable()
export class ViemService {
  constructor(private readonly configService: AppConfigService, private readonly logger: Logger) {
    this.logger = new Logger(ViemService.name)
  }

  getChain(chainId: string): {
    chain: Chain
  } {
    let chain

    switch (chainId) {
      case WalletChainIdEnum.POLYGON:
        chain = polygon
        break
      case WalletChainIdEnum.POLYGON_TESTNET:
        chain = polygonAmoy
        break
      default:
        throw new Error(`Unsupported chainId ${chainId}`)
    }

    return {
      chain,
    }
  }

  async verifyRewardClaim(
    reward: { walletAddress: string; amount: number },
    chainId: string,
  ): Promise<boolean> {
    const { chain } = this.getChain(chainId)

    const client = createPublicClient({
      chain,
      transport: http(),
    })

    const dispatcherAddress = this.getDispatcherAddress(chainId) as `0x${string}`

    const contract = getContract({
      address: dispatcherAddress,
      abi: polReward,
      client,
    })

    const result = await contract.read.getNativeValueFor([reward.walletAddress as `0x${string}`])

    return result > 0
  }

  getDispatcherAddress(chainId: string): string {
    switch (chainId) {
      case WalletChainIdEnum.POLYGON:
        return this.configService.polygonMainnetAddress
      case WalletChainIdEnum.POLYGON_TESTNET:
        return this.configService.polygonTestnetAddress
      default:
        throw new Error(`Unsupported chainId ${chainId}`)
    }
  }

  getRewardAbi(chainId: WalletChainIdEnum) {
    switch (chainId) {
      case WalletChainIdEnum.POLYGON:
        return polReward
      case WalletChainIdEnum.POLYGON_TESTNET:
        return polReward
      default:
        throw new Error(`Unsupported chainId ${chainId}`)
    }
  }
}
