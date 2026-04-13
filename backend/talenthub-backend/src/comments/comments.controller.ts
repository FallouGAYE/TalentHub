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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comments')
@Controller('posts/:id/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a comment to a post' })
  createComment(
    @Param('id') postId: string,
    @Req() req: Request,
    @Body() dto: CreateCommentDto,
  ) {
    const user = req.user as { id: string; email: string };
    return this.commentsService.createComment(postId, user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get comments for a post' })
  getCommentsByPostId(@Param('id') postId: string) {
    return this.commentsService.getCommentsByPostId(postId);
  }
}