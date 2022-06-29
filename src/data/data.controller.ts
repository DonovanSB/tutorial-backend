import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDataDto } from './dtos/create-data.dto';
import { MQTT_SERVICE } from './data.constants';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('data')
export class DataController {
  constructor(
    private readonly dataService: DataService,
    @Inject(MQTT_SERVICE) private client: ClientProxy,
  ) {}

  @Get(':macAddress')
  async findByMacAddress(@Param('macAddress') macAddress: string) {
    return this.dataService.findByMacAddress(macAddress);
  }

  @Post()
  async createData(@Body() createDataDto: CreateDataDto) {
    return this.dataService.createData(createDataDto);
  }

  @MessagePattern('rtu/#')
  async createDataTopic(@Payload() { macAddress, date, payload }: any) {
    if (!macAddress || !payload) {
      return;
    }
    console.log('Message from', macAddress);
    await this.dataService.createData({
      macAddress,
      date: date ? new Date(date * 1000) : new Date(),
      payload,
    });
  }
}
