import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { MqttConnectionOptions } from './config/mqtt.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());

  // @INFO: Initialize microservices
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: configService.get<MqttConnectionOptions>('mqtt'),
  });
  await app.startAllMicroservices();

  console.log(new Date());

  await app.listen(configService.get<number>('port'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
