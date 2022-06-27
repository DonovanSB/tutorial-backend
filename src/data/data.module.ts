import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Data, DataSchema } from './models/data.model';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { MQTT_SERVICE } from './data.constants';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MqttConnectionOptions } from 'src/config/mqtt.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }]),
  ],
  providers: [
    DataService,
    {
      provide: MQTT_SERVICE,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.MQTT,
          options: configService.get<MqttConnectionOptions>('mqtt'),
        });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [DataController],
})
export class DataModule {}
