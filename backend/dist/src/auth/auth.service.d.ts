import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { RoleId } from './constants/role.constants';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly prisma;
    private readonly jwtService;
    constructor(usersService: UsersService, prisma: PrismaService, jwtService: JwtService);
    register(payload: RegisterDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            roleId: RoleId;
        };
    }>;
    login(payload: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            roleId: RoleId;
        };
    }>;
    private buildAuthResponse;
}
