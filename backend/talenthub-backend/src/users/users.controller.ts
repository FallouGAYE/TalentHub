import {
  Controller,
  Delete,
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
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':id/follow')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Follow a user' })
  followUser(@Param('id') targetUserId: string, @Req() req: Request) {
    const user = req.user as { id: string; email: string };
    return this.usersService.followUser(user.id, targetUserId);
  }

  @Delete(':id/follow')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unfollow a user' })
  unfollowUser(@Param('id') targetUserId: string, @Req() req: Request) {
    const user = req.user as { id: string; email: string };
    return this.usersService.unfollowUser(user.id, targetUserId);
  }

  @Get(':id/followers')
  @ApiOperation({ summary: 'Get followers of a user' })
  getFollowers(@Param('id') userId: string) {
    return this.usersService.getFollowers(userId);
  }

  @Get(':id/following')
  @ApiOperation({ summary: 'Get users followed by a user' })
  getFollowing(@Param('id') userId: string) {
    return this.usersService.getFollowing(userId);
  }
}