import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventStoreCqrsModule } from './event-store/eventstore-cqrs/index';
import { TypegooseModule } from 'nestjs-typegoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import eventstore from './config/eventstore';
import mongo from './config/mongo';
import { eventStoreBusConfig } from './event-bus.provider';

import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [eventstore, mongo]
    }),
    EventStoreCqrsModule.forRootAsync(
      {
        useFactory: async (config: ConfigService) => ({
          connectionSettings: config.get('eventstore.connectionSettings'),
          endpoint: config.get('eventstore.tcpEndpoint'),
        }),
        inject: [ConfigService],
      },   
      eventStoreBusConfig,
    ),
    TypegooseModule.forRootAsync(
      {
        useFactory: async (config: ConfigService) => ({
          uri: config.get('mongo.uri')
        }),
        inject: [ConfigService]
      }
    ),
    AccountsModule
  ]
  /*controllers: [AppController],
  providers: [AppService],*/
})
export class AppModule {}
