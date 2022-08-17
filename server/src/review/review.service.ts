import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ObjectID } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { ReviewRepository } from './repo/review.repository';

@Injectable()
export class ReviewService {
  constructor(
    private reviewRepository: ReviewRepository,
    private userService: UserService,
  ) {}

  async create(createReviewDto: any, userId: number, fileNames: string[]) {
    let review: Review = new Review();
    review.Title = createReviewDto.Title;
    review.Place = createReviewDto.Place;
    review.Rating = createReviewDto.Rating;
    review.Experience = createReviewDto.Experience;
    review.start_date = createReviewDto.start_date;
    review.Images = fileNames;
    review.Hotel_name = createReviewDto.Hotel_name;
    review.Hotel_cost = createReviewDto.Hotel_cost;
    review.Hotel_refno = createReviewDto.Hotel_refno;
    review.Transport_name = createReviewDto.Transport_name;
    review.Transport_refno = createReviewDto.Transport_refno;
    review.Transport_cost = createReviewDto.Transport_cost;
    review.Favorite = false;
    review.user = await this.userService.findUserById(userId);

    console.log(review);
    return this.reviewRepository.save(review);
  }
  findReviewById(reviewid: number) {
    return this.reviewRepository.findOneOrFail({
      where: { id: reviewid },
    });
  }

  myReviews(userId: number) {
    return this.reviewRepository.find({
      relations: ['user'],
      where: { user: { id: userId } },
    });
  }

  // myFavoriteReviews(userId: number) {
  //   // let newId: ObjectId = new ObjectId(userId);
  //   return this.reviewRepository.find({
  //     relations: ['user'],
  //     where: { user: { id: userId }, Favorite: true },
  //   });
  // }
  myFavoriteReviews() {
    // let newId: ObjectId = new ObjectId(userId);
    return this.reviewRepository.find({
      where: { Favorite: true },
    });
  }

  allReviews() {
    return this.reviewRepository.find({
      order: {
        Rating: 'DESC',
      },
      take: 5,
    });
  }

  async updateReview(
    reviewid: number,
    updateReviewDto: any,
    filename: string[] | undefined,
  ) {
    let review = await this.reviewRepository.findOne({
      where: { id: reviewid },
    });
    review = { ...review, ...updateReviewDto };
    if (filename) review.Images = filename;
    // let review: Review = new Review();
    // review.id = reviewid;
    // review.Title = updateReviewDto.Title;
    // review.Place = updateReviewDto.Place;
    // review.Rating = updateReviewDto.Rating;
    // review.Experience = updateReviewDto.Experience;
    // review.start_date = updateReviewDto.start_date;
    // review.Images = filename;
    // review.Hotel_name = updateReviewDto.Hotel_name;
    // review.Hotel_cost = updateReviewDto.Hotel_cost;
    // review.Hotel_refno = updateReviewDto.Hotel_refno;
    // review.Transport_name = updateReviewDto.Transport_name;
    // review.Transport_refno = updateReviewDto.Transport_refno;
    // review.Transport_cost = updateReviewDto.Transport_cost;
    await this.reviewRepository.save(review);
    return review;
  }

  update(reviewid: number) {
    return this.reviewRepository.update(reviewid, {
      Favorite: true,
    });
  }
  removeFavorite(reviewid: number) {
    return this.reviewRepository.update(reviewid, {
      Favorite: false,
    });
  }

  remove(reviewid: number) {
    return this.reviewRepository.delete(reviewid);
  }

  // uploadImage(reviewId: number, filename: string[]) {
  //   return this.reviewRepository.update(reviewId, {
  //     Images: filename,
  //   });
  // }

  getImageByReviewId(reviewId: number) {
    return this.reviewRepository.find({
      select: ['Images'],
      where: { id: reviewId },
    });
  }
}
