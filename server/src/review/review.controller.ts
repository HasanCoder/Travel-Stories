import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  Param,
  Delete,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Res,
  UploadedFiles,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { threadId } from 'worker_threads';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { Observable, of } from 'rxjs';
import { join } from 'path';
import { User } from 'src/user/entities/user.entity';
import { Review } from './entities/review.entity';
import { existsSync, mkdirSync } from 'fs';
import * as FirebaseStorage from 'multer-firebase-storage';

export const storage = {
  storage: FirebaseStorage({
    bucketName: 'gs://travel-stories-74648.appspot.com',
    directoryPath: 'images',
    credentials: {
      clientEmail:
        'firebase-adminsdk-srddx@travel-stories-74648.iam.gserviceaccount.com',
      privateKey:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCoqHB77dDNF9pX\n4LKTyCTw6kIGhgb+Fxcfb1Q8eUgnH6ht6lgj0WxQZ6EcQbU89Xop48QAEzWElvOM\nyZSu+xxA5E+t0VM1PLmUWHF9TvJNo81HqvFZHt3JbU4NYyU0BvWDZOohMiY7y1FS\nr3lrCEgP0+rTNmGsR5DusYF5AVDFkbC828VoqSnHsXNfBb2Zl1/zU0u0b+4V2wC4\nS/XuPRa7nkH2V4aEkn7fT84KPJacVNZXijW9/RafJ+LMmNIC3FAjkul46t2w9Anu\nUt0dBoKdRSRK9qrFHZWe9VOvsN3JjQZOAf43WzXr6ypSNkyGnw/ZQ7276xA+000C\nqfEhrItfAgMBAAECggEAR0yp/OItHr8COZtOsyXt5AEMd4iKhTlKt6nPYR9ejteV\n0x26NC4xDY65r+HhVgtqoTHeJq/4NHzCKlb/qbeTmqVKP++ZrwxkYd+/3psU2Rix\nzCXqkOP5G9G/KO6siCGXAfyT9AOo4SdTUlLHUCW4nSRYBgFb6kJ49UeKNhcFx/de\neEu/nbs4CE7twKpeQc4ZhPV+9bcJq4Oic+msEM6TUGhdLjUt3ZYIEgNzelCV/aVV\nrJrqdc/lcAMWy1XeaepkLsSc3GjbP6SgvskUzPKEgTIWmTXhLASg5sva7X+k/tbs\nhK7SJdCFZ2rBreL9RQjD2xxR4JJXVtvl2PEoAoS6gQKBgQDinuf/eFdqm0ErXIYH\n5JIAwt4BbOqapule+VbqysgUS/4esI6NJTtHHo0aECrxcj9wkwc68evQQoEeVL5B\nXU3REF/Fr3eoGQw82dJvZDj/iKB2/M/l389638l5kytH8S50ZUN4cZO8n0z2fq39\nfBuuxmW8sdv7Rwt4mbSVT3kX3wKBgQC+hd0eD6wcqNLj9SxxoSbO/Re2XhEII/G6\nqUiVOyubAf2kPpRBHnCIt+rqcJciHFhih5BAnOAS7ZX8Fa5yNkV3gFX23cH0xkS+\nO21NCPPc/4Y4FVWp1lL/cXESW14HXSd5D8tMaL1ZblL81Aek8zy56cn59APIO2uN\nWKeDAtj8gQKBgHdJj/MQpGsQOBicBk0nSpct+/AiJcesLlF4zAChJvpQGf6Ljy3K\nuE4yTbG3avNW4P/f1MF5UFh6eT6++rqrY2e1x8PmHgUU0jVBrxxFVB9mCpk3cDOf\nQLZ8D7B4ACNJV9ua5g4DMvHppHhnrCwu5N91vV26/YFiHy6nMcAaajJfAoGAATiS\nZjLrg3OBhnx3wHKr8P+mO0D3EvpH/k4/bNVoPiIRIhBUmuY7CmVDWCVIkqtj1Z3Q\nytk2hmiHYYoyCAFZCJ8F7gMVzx/GKQHwfWHlTjFFBu78EY6SEZkEhH2ZaKqsKhZz\n0xWIwR334i7praDxbq+U38k0jP/0fH9o82n9QgECgYEAjVhRC6S+khSXa7yMll0S\nkYax+F4uTuzzNg63QqhH5LcpS/C/3LhiIbU1N5Cpwg3PScSFF2tUWbhHaoonrQ3d\nzMomoXcAnu0EM4nS7jK4m+4/HgW1GSi/6hBZ2iATPY5y9JKyWQS0atvulV2rUb3g\nASvCjnjN0djk97BLF/o8JP4=\n-----END PRIVATE KEY-----\n',
      projectId: 'travel-stories-74648',
    },
    hooks: {
      beforeUpload(req, file) {
        let splitted: string[] = file.originalname.split('.');
        file.originalname =
          splitted[0].replace(/\s/g, '') + uuidv4() + '.' + splitted[1];
      },
    },
  }),
};

@Controller('review')
@ApiTags('Review')
@ApiSecurity('JWT-auth')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post(':userId')
  @UseInterceptors(FilesInterceptor('Images', 10, storage))
  create(
    @UploadedFiles() files: Array<any>,
    @Param('userId') userId: number,
    @Body(ValidationPipe) body: any,
  ) {
    let fileNames: string[] = files.map((f) => f.originalname);
    // console.log(files);

    console.log(fileNames);

    // return {};
    return this.reviewService.create(body, userId, fileNames);
  }
  // @Post(':userId')
  // @UseInterceptors(FileInterceptor('Images', storage))
  // create(
  //   // @Body(ValidationPipe) createReviewDto: CreateReviewDto,
  //   @UploadedFile() file,
  //   @Param('userId') userId: number,
  //   @Body(ValidationPipe) body,
  // ) {
  //   console.log(body);
  //   console.log(file);

  //   // return {};
  //   return this.reviewService.create(body, Number(userId), file.filename);
  // }

  @Get()
  allReviews() {
    return this.reviewService.allReviews();
  }

  @Get('/myReviews/:userId')
  findMyReviews(@Param('userId') userId: number) {
    return this.reviewService.myReviews(Number(userId));
  }

  // @Get('/myFavoriteReviews/:userId')
  // findMyFavoriteReviews(@Param('userId') userId: number) {
  //   return this.reviewService.myFavoriteReviews(Number(userId));
  // }
  @Get('/myFavoriteReviews/')
  findMyFavoriteReviews() {
    return this.reviewService.myFavoriteReviews();
  }

  //Get Review by review id
  @Get(':id')
  findReviewById(@Param('id') id: number) {
    return this.reviewService.findReviewById(Number(id));
  }

  //Edit Review
  @Patch(':reviewid')
  @UseInterceptors(FilesInterceptor('Images', 10, storage))
  updateReview(
    @Body(ValidationPipe) body: any,
    @UploadedFiles() files: Array<any>,
    @Param('reviewid') reviewid: number,
  ) {
    let fileNames: string[] | undefined = files?.map((f) => f.originalname);
    console.log(fileNames);
    return this.reviewService.updateReview(Number(reviewid), body, fileNames);
  }

  //Mark Favorite
  @Patch('/markFavorite/:reviewId')
  update(@Param('reviewId') reviewId: number) {
    return this.reviewService.update(Number(reviewId));
  }

  @Patch('/removeFavorite/:reviewId')
  removeFavorite(@Param('reviewId') reviewId: number) {
    return this.reviewService.removeFavorite(Number(reviewId));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.reviewService.remove(Number(id));
  }

  // @Post('image/upload/:reviewId')
  // @UseInterceptors(FileInterceptor('photo', storage))
  // uploadFile(@UploadedFile() file, @Param('reviewId') reviewId: number): any {
  //   // console.log(reviewId);
  //   // console.log(file.filename);

  //   return this.reviewService.uploadImage(
  //     Number(reviewId),
  //     String(file.filename),
  //   );
  // }

  // @Post('image/upload')
  // @UseInterceptors(FilesInterceptor('files'))
  // uploadFile(
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  //   @Param('reviewId') reviewId: number,
  // ) {
  //   console.log(files);
  //   return this.reviewService.uploadImage(Number(reviewId), files);
  // }

  @Get('/image/:reviewId')
  findImage(@Param('reviewId') reviewId: number, @Res() res): any {
    let filename = null;
    const imagename = this.reviewService.getImageByReviewId(Number(reviewId));
    console.log('imagename :: ', +imagename);

    imagename.then(function (result) {
      filename = result.map((image) => {
        return image.Images;
      });
      console.log('filename :: ', +filename);
      return res.sendFile(
        join(process.cwd(), 'uploads/review-images/' + filename),
      );
    });
  }
}
