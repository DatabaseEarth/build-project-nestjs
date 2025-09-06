import { MiddlewareConsumer, Module, ValidationError, ValidationPipe } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { LoggingInterceptor, TransformInterceptor } from "./interceptors";
import { LoggerMiddleware } from "@/common/middleware";
import { ValidationException } from "@/common/pipes";
import { CatchEverythingFilter } from "@/common/filters";

@Module(
    {
        providers: [
            { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
            { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
            {
                provide: APP_PIPE,
                useValue: new ValidationPipe({
                    whitelist: true,
                    transform: true,
                    transformOptions: { enableImplicitConversion: true },
                    exceptionFactory: (errors: ValidationError[]) =>
                        new ValidationException(errors),
                }),
            },
            {
                provide: APP_FILTER,
                useClass: CatchEverythingFilter,
            },
        ],
    }
)
export class CoreModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('{*splat}');
    }
}