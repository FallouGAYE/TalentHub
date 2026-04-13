import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async getMyProfile(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return {
        message: 'Profile not created yet',
        profile: null,
      };
    }

    return profile;
  }

  async updateMyProfile(userId: string, dto: UpdateProfileDto) {
    const existingProfile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!existingProfile) {
      return this.prisma.profile.create({
        data: {
          userId,
          firstName: dto.firstName ?? '',
          lastName: dto.lastName ?? '',
          title: dto.title,
          bio: dto.bio,
          location: dto.location,
          avatarUrl: dto.avatarUrl,
        },
      });
    }

    return this.prisma.profile.update({
      where: { userId },
      data: dto,
    });
  }

  async getProfileByUserId(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }
}