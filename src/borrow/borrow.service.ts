import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BorrowService {
  constructor(private prisma: PrismaService) {}

  async create(createBorrowDto: CreateBorrowDto) {
    // Check if the book is available
    const book = await this.prisma.book.findUnique({
      where: { id: createBorrowDto.bookId },
    });

    if (!book || book.stock <= 0) {
      throw new NotFoundException('Book not available for borrowing');
    }
    // transaction to create borrow record and update book stock
    return this.prisma.$transaction(async (trx) => {
      const newBorrow = await trx.borrow.create({
        data: {
          studentId: createBorrowDto.studentId,
          bookId: createBorrowDto.bookId,
          borrowDate: createBorrowDto.borrowDate,
          dueDate: createBorrowDto.dueDate,
          returnDate: createBorrowDto.returnDate,
          status: 'BORROWED',
        },
        include: {
          student: true,
          book: true,
        },
      });
      await trx.book.update({
        where: { id: createBorrowDto.bookId },
        data: { stock: book.stock - 1 },
      });
      return {
        message: 'Borrow record created successfully',
        data: newBorrow,
      };
    });
  }

  async findAll() {
    return await this.prisma.borrow.findMany({
      include: {
        student: true,
        book: { include: { author: true, category: true } },
      },
      orderBy: { borrowDate: 'desc' },
    });
  }

  async findOne(id: number) {
    return await this.prisma.borrow.findUnique({
      where: { id },
      include: {
        student: true,
        book: { include: { author: true, category: true } },
      },
    });
  }

  async return(id: number) {
    //
    const borrow = await this.prisma.borrow.findUnique({
      where: { id },
    });
    if (!borrow) {
      throw new NotFoundException('Borrow record not found');
    }
    if (borrow.status == 'RETURNED') {
      throw new BadRequestException('Book already returned');
    }

    // trx to update borrow record and book stock
    await this.prisma.$transaction(async (trx) => {
      await trx.borrow.update({
        where: { id },
        data: {
          status: 'RETURNED',
          returnDate: new Date(),
        },
        include: { student: true, book: true },
      });
      await trx.book.update({
        where: { id: borrow.bookId },
        data: { stock: { increment: 1 } },
      });
    });
  }
}
