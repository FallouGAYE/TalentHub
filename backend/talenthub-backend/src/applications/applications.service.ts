import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}
async applyToJob(jobId: string, candidateId: string, dto: CreateApplicationDto) {
  const candidate = await this.prisma.user.findUnique({
    where: { id: candidateId },
  });

  if (!candidate) {
    throw new NotFoundException('Candidate not found');
  }

  if (candidate.role !== 'USER') {
    throw new ConflictException('Only users can apply to job offers');
  }

  const job = await this.prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    throw new NotFoundException('Job not found');
  }

  if (job.recruiterId === candidateId) {
    throw new ConflictException('You cannot apply to your own job offer');
  }

  const existingApplication = await this.prisma.application.findUnique({
    where: {
      jobId_candidateId: {
        jobId,
        candidateId,
      },
    },
  });

  if (existingApplication) {
    throw new ConflictException('You already applied to this job');
  }

  return this.prisma.application.create({
    data: {
      jobId,
      candidateId,
      resumeUrl: dto.resumeUrl,
    },
    include: {
      job: true,
      candidate: {
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
  async getMyApplications(candidateId: string) {
    return this.prisma.application.findMany({
      where: { candidateId },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        job: {
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
        },
      },
    });
  }
}