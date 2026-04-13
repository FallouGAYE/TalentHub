import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {

  @Get()
  @ApiOperation({ summary: 'Check API status' })
  check() {
    return {
      status: 'ok',
      service: 'TalentHub API'
    };
  }

}