import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ROLE } from '../auth/constants/role.constants';
import { CreateSlotDto } from './dto/create-slot.dto';
import { SlotsService } from './slots.service';

@Controller('slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Get('service/:serviceId')
  findByService(@Param('serviceId') serviceId: string, @Query('date') date?: string) {
    return this.slotsService.findByService(serviceId, date);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  create(@Body() body: CreateSlotDto) {
    return this.slotsService.create(body);
  }
}
