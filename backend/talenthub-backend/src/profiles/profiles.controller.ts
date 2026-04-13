import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
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
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my profile' })
  getMyProfile(@Req() req: Request) {
    const user = req.user as { id: string; email: string };
    return this.profilesService.getMyProfile(user.id);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create or update my profile' })
  updateMyProfile(@Req() req: Request, @Body() dto: UpdateProfileDto) {
    const user = req.user as { id: string; email: string };
    return this.profilesService.updateMyProfile(user.id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get public profile by user id' })
  getProfileByUserId(@Param('id') id: string) {
    return this.profilesService.getProfileByUserId(id);
  }
}