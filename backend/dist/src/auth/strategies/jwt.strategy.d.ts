import { ConfigService } from '@nestjs/config';
import { RoleId } from '../constants/role.constants';
type JwtPayload = {
    sub: string;
    email: string;
    roleId: RoleId;
};
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): {
        id: string;
        email: string;
        roleId: RoleId;
    };
}
export {};
