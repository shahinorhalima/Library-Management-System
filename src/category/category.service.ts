import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  /**
   * create a new category
   * @param createCategoryDto
   * @returns
   */
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
      },
    });

    return {
      data: category,
      message: 'Category created successfully',
    };
  }

  /**
   * get all categories
   * @returns new
   */

  async findAll() {
    return await this.prisma.category.findMany({
      include: {
        books: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.category.findUnique({
      where: { id },
      include: {
        books: true,
      },
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.prisma.category.update({
      where: { id },
      data: {
        name: updateCategoryDto.name,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
