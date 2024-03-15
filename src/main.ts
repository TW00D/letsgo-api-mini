import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './global/env/env.service';
import { CorsConfig } from './global/config/cors.config';
import { ExceptionFilter } from './global/exception/filter/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(CorsConfig)
  app.useGlobalFilters(new ExceptionFilter())

  await app.listen(EnvService.getPort())
}
bootstrap();
