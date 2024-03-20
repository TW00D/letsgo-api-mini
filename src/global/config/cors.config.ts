import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { EnvService } from "../env/env.service";

export const CorsConfig: CorsOptions = {
    // origin: [EnvService.getServerAddress()],
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept'
}