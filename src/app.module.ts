import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './global/config/env.config';
import { LoggerMiddleware } from './global/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(EnvConfig)
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}