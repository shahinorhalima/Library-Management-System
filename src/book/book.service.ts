import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    const book = await this.prisma.book.create({
      data: {
        name: createBookDto.name,
        stock: createBookDto.stock,
        summary: createBookDto.summary,
        authorId: createBookDto.authorId,
        categoryId: createBookDto.categoryId,
      },
    });

    return {
      message: 'Book created successfully',
      data: book,
    };
  }

  async findAll() {
    return await this.prisma.book.findMany({
      include: {
        category: true,
        author: true,
        borrows: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.book.findUnique({
      where: { id },
      include: {
        category: true,
        author: true,
        borrows: true,
      },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.prisma.book.update({
      where: { id },
      data: {
        name: updateBookDto.name,
        stock: updateBookDto.stock,
        summary: updateBookDto.summary,
        authorId: updateBookDto.authorId,
        categoryId: updateBookDto.categoryId,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.book.delete({
      where: { id },
    });
  }
}
