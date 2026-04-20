import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ROLE } from '../auth/constants/role.constants';
import { AdminService } from './admin.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  dashboard() {
    return this.adminService.dashboard();
  }

  @Get('users')
  users(@Query('search') search?: string) {
    return this.adminService.getUsers(search);
  }

  @Post('users')
  createUser(@Body() body: CreateAdminUserDto) {
    return this.adminService.createUser(body);
  }

  @Get('users/:id')
  userById(@Param('id') id: string) {
    return this.adminService.getUserById(id);
  }

  @Patch('users/:id/status')
  userStatus(@Param('id') id: string, @Body() body: UpdateUserStatusDto) {
    return this.adminService.updateUserStatus(id, body.isActive);
  }

  @Get('bookings')
  bookings(@Query('search') search?: string) {
    return this.adminService.getBookings(search);
  }
}
