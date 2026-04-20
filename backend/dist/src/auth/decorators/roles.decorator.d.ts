import { RoleId } from '../constants/role.constants';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: RoleId[]) => import("@nestjs/common").CustomDecorator<string>;
