import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            roleId: import("./constants/role.constants").RoleId;
        };
    }>;
    login(body: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            roleId: import("./constants/role.constants").RoleId;
        };
    }>;
    me(user: {
        id: string;
        email: string;
        roleId: number;
    }): {
        id: string;
        email: string;
        roleId: number;
    };
}
