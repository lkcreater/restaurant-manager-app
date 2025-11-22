import { RouterModule } from "@nestjs/core";
import { HealthModule } from "./modules/health/health.module";
import { UploadsModule } from "./modules/uploads/uploads.module";

const APP_PREFIX = process.env.APP_PREFIX ?? 'api';
const APP_VERSION = process.env.APP_VERSION ?? 'v1';

export class RoutersAppModule {

    static loadModules() {
        return [
            HealthModule,
            UploadsModule,
        ];
    }

    static register() {
        return RouterModule.register([
            {
                path: `${APP_PREFIX}/${APP_VERSION}`,
                children: [
                    {
                        path: `health`,
                        module: HealthModule,
                    },
                    {
                        path: `uploads`,
                        module: UploadsModule,
                    },
                ]
            }
        ]);
    }
}