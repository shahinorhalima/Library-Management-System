import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({
    example: 'F. Scott Fitzgerald',
    description: 'The name of the author',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'image upload or not ',
    description: 'The image of the author',
  })
  @IsString()
  image: string;

  @ApiProperty({
    example:
      'F. Scott Fitzgerald was an American novelist and short story writer.',
    description: 'The biography of the author',
  })
  @IsString()
  bio: string;
}
