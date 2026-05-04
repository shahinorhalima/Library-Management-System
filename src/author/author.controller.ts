import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('author')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new author record' })
  @ApiResponse({ status: 201, description: 'the recored has been successed' })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all author records' })
  @ApiResponse({ status: 200, description: 'get all recorded author success' })
  findAll() {
    return this.authorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a author record by id' })
  @ApiResponse({ status: 200, description: 'get a author record by id' })
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a author record by id' })
  @ApiResponse({ status: 200, description: 'update a author record by id' })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a author record by id' })
  @ApiResponse({ status: 200, description: 'delete a author record by id' })
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
