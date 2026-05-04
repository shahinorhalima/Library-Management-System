import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * create a new category
   * @param createCategoryDto
   * @returns
   */

  @Post('create')
  @ApiOperation({ summary: 'create a new category' })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  /**
   * get all categories
   * @returns
   */

  @Get()
  @ApiOperation({ summary: 'get all categories' })
  @ApiResponse({
    status: 200,
    description: 'The categories have been successfully retrieved.',
  })
  findAll() {
    return this.categoryService.findAll();
  }

  /**
   *
   * @param id
   * @returns
   */

  @Get(':id')
  @ApiOperation({ summary: 'get a category by id' })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully retrieved.',
  })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  /**
   *
   * @param id
   * @param updateCategoryDto
   * @returns
   */

  @Patch(':id')
  @ApiOperation({ summary: 'update a category by id' })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully updated.',
  })

  /**
   * update a category by id
   * @param id
   * @param updateCategoryDto
   * @returns
   */
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
