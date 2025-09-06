import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('NestJS API')
  .setDescription('The NestJS API description')
  .setVersion('1.0')
  .build();

export const createSwaggerDocument = (app: NestExpressApplication) => {
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [
    ],
  });

  SwaggerModule.setup('api-doc', app, document, {
    swaggerOptions: {
      docExpansion: true,
    },
  });
};
