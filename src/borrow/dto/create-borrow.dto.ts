import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBorrowDto {
  @IsNumber()
  @IsNotEmpty()
  studentId: number;
  @IsNumber()
  @IsNotEmpty()
  bookId: number;
  @IsDate()
  borrowDate: Date;
  @IsDate()
  dueDate: Date;
  @IsDate()
  returnDate: Date | null;
  @IsString()
  status: 'BORROWED' | 'RETURNED' | 'OVERDUE';
}
