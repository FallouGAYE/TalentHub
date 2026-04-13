import {
  Controller,
  Delete,
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
import { LikesService } from './likes.service';

@ApiTags('Likes')
@Controller('posts/:id/like')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Like a post' })
  likePost(@Param('id') postId: string, @Req() req: Request) {
    const user = req.user as { id: string; email: string };
    return this.likesService.likePost(postId, user.id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unlike a post' })
  unlikePost(@Param('id') postId: string, @Req() req: Request) {
    const user = req.user as { id: string; email: string };
    return this.likesService.unlikePost(postId, user.id);
  }
}