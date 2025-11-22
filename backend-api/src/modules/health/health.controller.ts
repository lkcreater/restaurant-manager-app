import { Controller, Get } from '@nestjs/common';
import {
    HealthCheck,
    HealthCheckService,
    TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private db: TypeOrmHealthIndicator,
    ) { }

    @Get()
    @HealthCheck()
    @ApiOperation({ summary: 'Check application health' })
    @ApiResponse({ status: 200, description: 'Application is healthy' })
    check() {
        return this.health.check([]);
    }

    @Get('db')
    @HealthCheck()
    @ApiOperation({ summary: 'Check database health' })
    @ApiResponse({ status: 200, description: 'Database is healthy' })
    @ApiResponse({ status: 503, description: 'Database is unhealthy' })
    checkDatabase() {
        return this.health.check([() => this.db.pingCheck('database')]);
    }
}
