import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsModule } from './accounts/accounts.module';
import eventstore from './config/eventstore';
import mongo from './config/mongo';
import { eventStoreBusConfig } from './event-bus.provider';
import { EventStoreCqrsModule } from './event-store/eventstore-cqrs/index';
import { SelectionsModule } from './selections/selections.module';



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
    MongooseModule.forRootAsync(
      {
        useFactory: async (config: ConfigService) => ({
          uri: config.get('mongo.uri')
        }),
        inject: [ConfigService]
      }
    ),
    AccountsModule,
    SelectionsModule
  ]
})
export class AppModule {}
