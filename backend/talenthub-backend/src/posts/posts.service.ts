import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(userId: string, dto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        content: dto.content,
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async getAllPosts() {
    return this.prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            role: true,
            profile: true,
          },
        },
        comments: true,
        likes: true,
      },
    });
  }

  async getFeed(userId: string) {
    const followingRelations = await this.prisma.follow.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followingId: true,
      },
    });

    const followingIds = followingRelations.map(
      (relation) => relation.followingId,
    );

    const visibleAuthorIds = [userId, ...followingIds];

    return this.prisma.post.findMany({
      where: {
        authorId: {
          in: visibleAuthorIds,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            role: true,
            profile: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                email: true,
                profile: true,
              },
            },
          },
        },
        likes: true,
      },
    });
  }

  async getPostById(postId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            role: true,
            profile: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                email: true,
                profile: true,
              },
            },
          },
        },
        likes: true,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }
}