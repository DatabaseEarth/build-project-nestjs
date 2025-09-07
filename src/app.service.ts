import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
    constructor(private readonly configService: ConfigService) { }

    getConfig() {
        return {
            port: this.configService.get<number>('app.port'),
            host: this.configService.get<string>('app.host')
        }
    }
}