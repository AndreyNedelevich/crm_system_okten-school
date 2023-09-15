import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { SwaggerHelper } from './common/helpers/swgger.helpers';
import { AppConfigService } from './config/app/configuration.service';

function initSwagger(app: INestApplication): void {
  const documentBuilder: DocumentBuilder = new DocumentBuilder()
    .setTitle('srm okten')
    .setDescription('srm system')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .setVersion('0.0.1');

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerHelper.setDefaultResponses(document);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelExpandDepth: 1,
      persistAuthorization: true,
    },
  });
}

function setCorsPolicy(app: INestApplication): void {
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Requested-With,content-type',
      'Origin',
      'Access-Control-Allow-Origin',
    ],
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setCorsPolicy(app);
  initSwagger(app);

  const appConfig: AppConfigService =
    app.get<AppConfigService>(AppConfigService);

  await app.listen(appConfig.port, appConfig.hostname, () => {
    const url = `http://${appConfig.hostname}:${appConfig.port}`;
    Logger.log(`Server is running ${url}`);
    Logger.log(`Swagger is running ${url}/docs`);
  });
}
bootstrap();