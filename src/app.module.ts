import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';
import { join } from 'path/posix';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { User, UserSchema } from './model/user.schema';
import { Video, VideoSchema } from './model/video.schema';
import { VideoController } from './controller/video.controller';
import { UserController } from './controller/user.controller';
import { VideoService } from './model/video.service';
import { UserService } from './model/user.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Stream'),
    MulterModule.register({
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const ext = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
        },
      }),
    }),
    JwtModule.register({ secret, signOptions: { expiresIn: '2h' } }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),

    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController, VideoController, UserController],
  providers: [AppService, VideoService, UserService],
})
export class AppModule {}
