import { ServiceStatus } from '@prisma/client';
import { IsEnum, IsInt, IsString, Max, Min } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsInt()
  @Min(1)
  avgServiceTime: number;

  @IsEnum(ServiceStatus)
  status: ServiceStatus;

  @IsInt()
  @Min(5)
  @Max(60)
  slotDuration: number;

  @IsInt()
  @Min(1)
  slotCapacity: number;

  @IsString()
  openingTime: string;

  @IsString()
  closingTime: string;
}
