import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    example: 'The Great Gatsby',
    description: 'The name of the book',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'F. Scott Fitzgerald',
    description: 'The author of the book',
  })
  @IsNumber()
  @IsNotEmpty()
  stock: number;
  @ApiProperty({
    example: 'A novel set in the Roaring Twenties...',
    description: 'A brief summary of the book',
  })
  @IsString()
  summary: string;

  @ApiProperty({ example: 1, description: 'The ID of the author' })
  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @ApiProperty({ example: 1, description: 'The ID of the author' })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
