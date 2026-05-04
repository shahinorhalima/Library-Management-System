import { ApiAcceptedResponse, ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'the name of the category',
    example: 'Books',
  })
  @IsString()
  name: string;
}
