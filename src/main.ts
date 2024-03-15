import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './global/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(EnvService.getPort())
}
bootstrap();
