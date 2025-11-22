import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseConfig } from './config/database.config';
import { getLoggerConfig } from './config/logger.config';
import { RoutersAppModule } from './app.routers';

@Module({
  imports: [
    // Configuration module
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // Database module
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    // Logger module
    WinstonModule.forRoot(getLoggerConfig()),
    // Feature modules

    ...RoutersAppModule.loadModules(),
    RoutersAppModule.register()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

