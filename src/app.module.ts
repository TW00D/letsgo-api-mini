import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './global/config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot(EnvConfig)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
