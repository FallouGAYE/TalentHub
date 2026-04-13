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
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new post' })
  createPost(@Req() req: Request, @Body() dto: CreatePostDto) {
    const user = req.user as { id: string; email: string };
    return this.postsService.createPost(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get('feed')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get personalized feed' })
  getFeed(@Req() req: Request) {
    const user = req.user as { id: string; email: string };
    return this.postsService.getFeed(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by id' })
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }
}