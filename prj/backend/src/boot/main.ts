import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './../app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const doc = new DocumentBuilder()
    .setTitle('Sandbox manager API')
    .setDescription('The Sandbox manager APIs.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, doc, {});
  SwaggerModule.setup('api', app, document);

  await app.listen(4300);
}
bootstrap();
