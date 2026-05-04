import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}
  async create(createAuthorDto: CreateAuthorDto) {
    const { name, image, bio } = createAuthorDto;
    const author = await this.prisma.author.create({
      data: {
        name,
        image,
        bio,
      },
    });
    return {
      message: 'Author created successfully',
      data: author,
    };
  }

  async findAll() {
    return await this.prisma.author.findMany({
      include: {
        books: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.author.findUnique({
      where: { id },
      include: {
        books: true,
      },
    });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return await this.prisma.author.update({
      where: { id },
      data: { ...updateAuthorDto },
    });
  }

  async remove(id: number) {
    return await this.prisma.author.delete({
      where: { id },
    });
  }
}
