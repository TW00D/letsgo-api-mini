import { ConfigModuleOptions } from "@nestjs/config";

export const EnvConfig: ConfigModuleOptions = { 
    isGlobal: true,
    envFilePath: '.env' 
}