import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateDataDto {
  @IsNotEmpty()
  @IsString()
  readonly macAddress: string;

  @IsNotEmpty()
  readonly date: Date;

  @IsObject()
  readonly data: object;
}
