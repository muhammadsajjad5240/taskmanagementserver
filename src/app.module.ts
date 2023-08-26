import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';

import { AppController } from './app.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    forwardRef(() => DatabaseModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => TaskModule),
  ],
  controllers: [AppController],
  providers: [
  ],
})
export class AppModule {}
