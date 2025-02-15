import { IsNumber, Min, Max } from 'class-validator';

export class UpdateRatingDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
