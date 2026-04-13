import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'Je travaille sur TalentHub, un mini LinkedIn avec NestJS et Prisma.',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  content: string;
}