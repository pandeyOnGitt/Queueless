import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateSlotDto {
  @IsString()
  serviceId: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;
}
