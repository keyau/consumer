import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventStoreCqrsModule } from './event-store/eventstore-cqrs/index';
import { TypegooseModule } from 'nestjs-typegoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import eventstore from './config/eventstore';
import { eventStoreBusConfig } from './event-bus.provider';

import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [eventstore]
    }),
    EventStoreCqrsModule.forRootAsync(
      {
        useFactory: async (config: ConfigService) => {
          return {
            connectionSettings: config.get('eventstore.connectionSettings'),
            endpoint: config.get('eventstore.tcpEndpoint'),
          };
        },
        inject: [ConfigService],
      },   
      eventStoreBusConfig,
    ),
    TypegooseModule.forRoot("mongodb://defaultUser:password@localhost:27017/consumer"),
    AccountsModule
  ]
  /*controllers: [AppController],
  providers: [AppService],*/
})
export class AppModule {}
