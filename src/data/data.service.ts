import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Data, DataDocument } from './models/data.model';
import { CreateDataDto } from './dtos/create-data.dto';

@Injectable()
export class DataService {
  constructor(
    @InjectModel(Data.name)
    private readonly dataModel: Model<DataDocument>,
  ) {}
  async createData(data: CreateDataDto) {
    return await this.dataModel.create({ ...data, date: new Date(data.date) });
  }
  async findByMacAddress(macAddress: string) {
    return await this.dataModel.find({ macAddress });
  }
}
