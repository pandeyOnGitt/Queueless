import { SetMetadata } from '@nestjs/common';
import { RoleId } from '../constants/role.constants';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleId[]) => SetMetadata(ROLES_KEY, roles);
