import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsString()
  Title: string;

  @ApiProperty()
  @IsString()
  Place: string;

  @ApiProperty()
  @IsNumber()
  Rating: number;

  @ApiProperty()
  @IsString()
  Experience: string;

  @ApiProperty()
  @IsString()
  start_date: string;

  @ApiProperty()
  Images: string[];

  @ApiProperty()
  @IsString()
  Hotel_name: string;

  @ApiProperty()
  @IsNumber()
  Hotel_cost: number;

  @ApiProperty()
  @IsString()
  Hotel_refno: string;

  @ApiProperty()
  @IsString()
  Transport_name: string;

  @ApiProperty()
  @IsNumber()
  Transport_cost: number;

  @ApiProperty()
  @IsString()
  Transport_refno: string;
}
