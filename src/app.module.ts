import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlacesModule } from './places/places.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DescriptionsModule } from './descriptions/descriptions.module';
import { AudiosModule } from './audios/audios.module';
import { dbConnection } from './common/providers/db.provider';
import { configureMongoose } from './common/config/mongoose.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        if (!uri) {
          throw new Error('MONGODB_URI không được định nghĩa!');
        }
        await dbConnection(uri);
        configureMongoose();
        return { uri }
      },
      inject: [ConfigService],
    }),
    PlacesModule,
    DescriptionsModule,
    AudiosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('places', 'descriptions', 'audios'); //option 1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes(
    //     { path: 'places', method: RequestMethod.POST },
    //     { path: 'places', method: RequestMethod.GET },
    //   ); //option 2
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes(
    //     { path: 'places/(.*)', method: RequestMethod.ALL },
    //     { path: 'descriptions/(.*)', method: RequestMethod.ALL },
    //   ); //option 3
    // consumer.apply(LoggerMiddleware).forRoutes(PlacesController); //option 4
  }
}
