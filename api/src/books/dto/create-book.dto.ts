import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsUUID,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  author: string;

  @IsOptional()
  @IsString()
  isbn?: string;

  @IsInt()
  @Min(0)
  totalCopies: number;

  @IsUUID()
  genreId: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  publishedYear?: number;
}