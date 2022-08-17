import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { CustomRepository } from '../../database/typeorm-ex.decorator';
import { Injectable } from '@nestjs/common';

@CustomRepository(Review)
@Injectable()
export class ReviewRepository extends Repository<Review> {}
