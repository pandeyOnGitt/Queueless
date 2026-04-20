import { IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  serviceId: string;

  @IsString()
  slotId: string;
}
