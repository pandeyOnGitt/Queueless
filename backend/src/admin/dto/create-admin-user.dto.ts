import { Type } from 'class-transformer';
import { IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateAdminUserDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @Type(() => Number)
  @IsIn([1, 2])
  roleId: number;

  @IsOptional()
  @Type(() => Boolean)
  isActive?: boolean;
}
