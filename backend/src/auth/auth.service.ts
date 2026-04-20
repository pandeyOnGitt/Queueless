import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { ROLE, RoleId } from './constants/role.constants';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(payload: RegisterDto) {
    const existing = await this.usersService.findByEmail(payload.email);
    if (existing) {
      throw new BadRequestException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(payload.password, 10);
    const user = await this.prisma.user.create({
      data: {
        fullName: payload.fullName,
        email: payload.email,
        passwordHash,
        roleId: ROLE.USER,
      },
    });

    return this.buildAuthResponse(user.id, user.email, user.roleId as RoleId);
  }

  async login(payload: LoginDto) {
    const user = await this.usersService.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(payload.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!user.isActive) {
      throw new UnauthorizedException('Account is inactive');
    }

    return this.buildAuthResponse(user.id, user.email, user.roleId as RoleId);
  }

  private buildAuthResponse(userId: string, email: string, roleId: RoleId) {
    const token = this.jwtService.sign({
      sub: userId,
      email,
      roleId,
    });

    return {
      accessToken: token,
      user: {
        id: userId,
        email,
        roleId,
      },
    };
  }
}
