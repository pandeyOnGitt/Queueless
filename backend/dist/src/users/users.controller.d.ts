import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    me(user: {
        id: string;
    }): Promise<{
        id: string;
        email: string;
        fullName: string;
        roleId: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
