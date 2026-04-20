import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@CurrentUser() user: { id: string }, @Body() body: CreateBookingDto) {
    return this.bookingsService.create(user.id, body);
  }

  @Get('my')
  myBookings(@CurrentUser() user: { id: string }) {
    return this.bookingsService.getMyBookings(user.id);
  }
}
