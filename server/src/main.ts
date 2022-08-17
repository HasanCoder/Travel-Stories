import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guard/jwt.guard';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, './public'), {
    prefix: '/public/',
  });
  app.useGlobalGuards(new JwtAuthGuard());
  app.enableCors();

  console.log(join(__dirname, '..', '../build'));

  const options = new DocumentBuilder()
    .setTitle('Travel_Strories')
    .setDescription('Travel Stories NestApp Rest API docs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT Token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.setGlobalPrefix('api');
  await app.listen(parseInt(process.env.PORT) || 3000, '0.0.0.0');
}
bootstrap();
