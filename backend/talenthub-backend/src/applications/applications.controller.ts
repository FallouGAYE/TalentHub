import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationsService } from './applications.service';

@ApiTags('Applications')
@Controller()
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post('jobs/:id/apply')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Apply to a job' })
  applyToJob(
    @Param('id') jobId: string,
    @Req() req: Request,
    @Body() dto: CreateApplicationDto,
  ) {
    const user = req.user as { id: string; email: string };
    return this.applicationsService.applyToJob(jobId, user.id, dto);
  }

  @Get('applications/me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my applications' })
  getMyApplications(@Req() req: Request) {
    const user = req.user as { id: string; email: string };
    return this.applicationsService.getMyApplications(user.id);
  }
}