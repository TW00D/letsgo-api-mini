import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './global/env/env.service';
import { CorsConfig } from './global/config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(CorsConfig)

  await app.listen(EnvService.getPort())
}
bootstrap();
