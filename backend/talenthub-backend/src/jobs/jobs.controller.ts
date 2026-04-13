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
import { CreateJobDto } from './dto/create-job.dto';
import { JobsService } from './jobs.service';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new job offer' })
  createJob(@Req() req: Request, @Body() dto: CreateJobDto) {
    const user = req.user as { id: string; email: string };
    return this.jobsService.createJob(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all job offers' })
  getAllJobs() {
    return this.jobsService.getAllJobs();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job by id' })
  getJobById(@Param('id') id: string) {
    return this.jobsService.getJobById(id);
  }
}