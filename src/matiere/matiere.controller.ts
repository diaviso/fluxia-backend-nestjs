import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { MatiereService } from './matiere.service';
import { CreateMatiereDto } from './dto/create-matiere.dto';
import { UpdateMatiereDto } from './dto/update-matiere.dto';

@Controller('matieres')
export class MatiereController {
  constructor(private readonly matiereService: MatiereService) {}

  @Post()
  create(@Body() createMatiereDto: CreateMatiereDto) {
    return this.matiereService.create(createMatiereDto);
  }

  @Get()
  findAll(@Query('type') type?: string) {
    if (type) {
      return this.matiereService.findByType(type);
    }
    return this.matiereService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.matiereService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMatiereDto: UpdateMatiereDto) {
    return this.matiereService.update(id, updateMatiereDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.matiereService.remove(id);
  }
}
