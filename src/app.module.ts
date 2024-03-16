import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './global/config/env.config';
import { LoggerMiddleware } from './global/middleware/logger.middleware';
import { AuthModule } from './domain/auth/presentation/module/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(EnvConfig),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}