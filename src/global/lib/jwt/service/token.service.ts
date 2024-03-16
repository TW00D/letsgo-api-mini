import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TokenResponse } from "src/global/lib/jwt/dto/token.dto";
import { Payload } from "../dto/payload.dto";
import { EnvService } from "src/global/env/env.service";

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService){}

    async generateAccessToken(payload: Payload): Promise<string> {
        return await this.jwtService.signAsync(
            {
                iss: payload.iss
            },
            {
                secret: EnvService.getAccessTokenSecretKey(),
                expiresIn: EnvService.getAccessTokenExpiresIn()
            }
        )
    }

    async generateRefreshToken(payload: Payload): Promise<string> {
        return await this.jwtService.signAsync(
            {
                iss: payload.iss
            }, 
            {
                secret: EnvService.getRefreshTokenSecretKey(), 
                expiresIn: EnvService.getRefreshTokenExpiresIn()
            }
        )
    }

    async generateUserToken(payload: Payload): Promise<TokenResponse> {
        return TokenResponse.of({
            access_token: await this.generateAccessToken(payload),
            refresh_token: await this.generateRefreshToken(payload)
        })
    }

    async refreshUserToken(refresh_token: string): Promise<TokenResponse> {
        const username = await this.validateRefreshToken(refresh_token)
        const payload: Payload = {iss: username}
        return TokenResponse.of({
            access_token: await this.generateAccessToken(payload),
            refresh_token: await this.generateRefreshToken(payload)
        })
    }

    async validateAccessToken(token: string): Promise<string> {
        const claims = await this.jwtService.verifyAsync(
            token, 
            {
                secret: EnvService.getAccessTokenSecretKey()
            }
        )
        return claims.iss
    }

    async validateRefreshToken(token: string): Promise<string> {
        const claims = await this.jwtService.verifyAsync(
            token, 
            {
                secret: EnvService.getRefreshTokenSecretKey()
            }
        )
        return claims.iss
    }

    async parseToken(token: string): Promise<any> {
        const claims = await this.jwtService.decode(token)
        return claims
    }
}