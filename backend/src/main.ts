import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ১. CORS অন করা (খুবই জরুরি)
  app.enableCors();

  // ২. পোর্ট ৫০০০ এ রান করা
  await app.listen(5000);
  console.log(`Backend is running on: http://localhost:5000`);
}
bootstrap();