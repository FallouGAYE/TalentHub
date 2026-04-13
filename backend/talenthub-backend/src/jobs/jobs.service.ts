import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}
async createJob(recruiterId: string, dto: CreateJobDto) {
  const recruiter = await this.prisma.user.findUnique({
    where: { id: recruiterId },
  });

  if (!recruiter) {
    throw new NotFoundException('User not found');
  }

  if (recruiter.role !== 'RECRUITER') {
    throw new ForbiddenException('Only recruiters can create job offers');
  }

  return this.prisma.job.create({
    data: {
      title: dto.title,
      description: dto.description,
      location: dto.location,
      contractType: dto.contractType,
      recruiterId,
    },
    include: {
      recruiter: {
        select: {
          id: true,
          email: true,
          role: true,
          profile: true,
        },
      },
    },
  });
}
  async getAllJobs() {
    return this.prisma.job.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        recruiter: {
          select: {
            id: true,
            email: true,
            role: true,
            profile: true,
          },
        },
        applications: true,
      },
    });
  }

  async getJobById(jobId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: {
        recruiter: {
          select: {
            id: true,
            email: true,
            role: true,
            profile: true,
          },
        },
        applications: {
          include: {
            candidate: {
              select: {
                id: true,
                email: true,
                role: true,
                profile: true,
              },
            },
          },
        },
      },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job;
  }
}