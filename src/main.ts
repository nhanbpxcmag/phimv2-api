import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsCustom } from './configs/corsCustom';

declare const module: any;
const port = parseInt(process.env.PORT, 10) || 3000;

async function bootstrap() {
  console.log(process.env.DB_PASSWORD);
  const app = await NestFactory.create(AppModule);

  // app.enableCors(corsCustom);
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    // preflightContinue: true,
  });

  await app.listen(port);

  console.log('-----++ Start port: ', port);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
