import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  // Create a new genre
  async create(data: { name: string; description?: string }) {
    const existingGenre = await this.prisma.genre.findUnique({
      where: { name: data.name },
    });

    if (existingGenre) {
      throw new ConflictException('Genre already exists');
    }

    return this.prisma.genre.create({
      data,
    });
  }

  // Get all genres
  async findAll() {
    return this.prisma.genre.findMany({
      include: { books: true },
    });
  }

  // Get one genre by ID
  async findOne(id: string) {
    const genre = await this.prisma.genre.findUnique({
      where: { id },
      include: { books: true },
    });

    if (!genre) {
      throw new NotFoundException('Genre not found');
    }

    return genre;
  }

  // Update a genre
  async update(
    id: string,
    data: { name?: string; description?: string },
  ) {
    await this.findOne(id);

    return this.prisma.genre.update({
      where: { id },
      data,
    });
  }

  // Delete a genre
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.genre.delete({
      where: { id },
    });
  }
}