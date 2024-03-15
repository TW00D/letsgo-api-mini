import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EnvService {
    static configService = new ConfigService()

    static getEnv<T>(name: string): T {
        return this.configService.get<T>(name)
    }

    static getDatabaseUrl(): string {
        return this.configService.get<string>("DATABASE_URL")
    }

    static getPort(): number {
        return this.configService.get<number>("PORT")
    }

    static getServer(): string {
        return this.configService.get<string>("SERVER")
    }

    static getServerAddress(): string {
        return `${this.getServer}:${this.getPort}`
    }
}