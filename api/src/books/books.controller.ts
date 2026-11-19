
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // Public: retrieve and search books
  @Get()
  findAll(
    @Query('genreId') genreId?: string,
    @Query('search') search?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 10,
  ) {
    return this.booksService.findAll(genreId, search, page, limit);
  }

  // Public: retrieve one book
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  // Only authenticated LIBRARIAN users
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('LIBRARIAN')
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  // Only authenticated LIBRARIAN users
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('LIBRARIAN')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(id, updateBookDto);
  }

  // Only authenticated LIBRARIAN users
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('LIBRARIAN')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}

