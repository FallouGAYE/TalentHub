import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateJobDto {
  @ApiProperty({ example: 'Backend Developer Intern' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @ApiProperty({
    example: 'We are looking for a backend intern familiar with NestJS and PostgreSQL.',
  })
  @IsString()
  @MinLength(10)
  @MaxLength(3000)
  description: string;

  @ApiPropertyOptional({ example: 'Paris' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  location?: string;

  @ApiPropertyOptional({ example: 'Internship' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  contractType?: string;
}