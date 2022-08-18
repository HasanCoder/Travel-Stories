import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client/build'),
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      // ssl: {
      //   rejectUnauthorized: false,
      // },
      synchronize: true, // This for development
      autoLoadEntities: true,
      // useFactory: (configService: ConfigService) => ({
      //   type: 'postgres',
      //   name: connectionOptions.name,
      //   host: connectionOptions.host,
      //   port: connectionOptions.port,
      //   username: connectionOptions.username,
      //   password: connectionOptions.password,
      //   database: connectionOptions.database,
      //   synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // }),
    }),
    UserModule,
    ReviewModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
