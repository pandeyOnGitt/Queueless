import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ROLE } from '../auth/constants/role.constants';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get('service/:serviceId')
  getServiceQueue(@Param('serviceId') serviceId: string) {
    return this.queueService.getServiceQueue(serviceId);
  }

  @Patch('service/:serviceId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  updateServiceQueue(
    @Param('serviceId') serviceId: string,
    @Body() body: UpdateQueueDto,
  ) {
    return this.queueService.updateServiceQueue(serviceId, body);
  }
}
