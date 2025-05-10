import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './modules/infrastructure/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  // app.useGlobalPipes(new ValidationPipe({ transform: true, skipMissingProperties: false }))

  const configService = app.get(ConfigService);
  const port = configService.getAndCheck('HTTP_PORT');

  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Contpaqi API Project')
    .setDescription('Contpaqi API Project')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.getHttpAdapter().get('/', (req, res) => {
    res.redirect('/api');
  });

  await app.listen(port);
}
bootstrap();
