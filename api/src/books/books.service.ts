import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  // Create a book
  async create(data: CreateBookDto) {
    if (data.isbn) {
      const existingBook = await this.prisma.book.findUnique({
        where: { isbn: data.isbn },
      });

      if (existingBook) {
        throw new ConflictException('A book with this ISBN already exists');
      }
    }

    return this.prisma.book.create({
      data,
      include: { genre: true },
    });
  }

  // Get books with filtering, searching and pagination
  async findAll(
    genreId?: string,
    search?: string,
    page = 1,
    limit = 10,
  ) {
    const skip = (page - 1) * limit;

    const where = {
      ...(genreId ? { genreId } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' as const } },
              { author: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [books, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        skip,
        take: limit,
        include: { genre: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.book.count({ where }),
    ]);

    return {
      data: books,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get one book
  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { genre: true },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  // Update a book
  async update(id: string, data: UpdateBookDto) {
    await this.findOne(id);

    if (data.isbn) {
      const existingBook = await this.prisma.book.findUnique({
        where: { isbn: data.isbn },
      });

      if (existingBook && existingBook.id !== id) {
        throw new ConflictException('A book with this ISBN already exists');
      }
    }

    return this.prisma.book.update({
      where: { id },
      data,
      include: { genre: true },
    });
  }

  // Delete a book
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.book.delete({
      where: { id },
    });
  }
}