import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 'Bravo, très bon projet !',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  content: string;
}