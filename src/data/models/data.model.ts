import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DataDocument = Data & Document;

@Schema()
export class Data {
  id: string;

  @Prop()
  macAddress: string;

  @Prop()
  date: Date;

  @Prop({ type: Object })
  payload: object;
}

export const DataSchema = SchemaFactory.createForClass(Data);
