import { ServiceStatus } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateQueueDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  currentQueueLength?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  currentToken?: number;

  @IsOptional()
  @IsEnum(ServiceStatus)
  status?: ServiceStatus;

  @IsOptional()
  @IsString()
  note?: string;
}
