import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { LigneEBService } from './ligne-eb.service';
import { CreateLigneEBDto } from './dto/create-ligne-eb.dto';
import { UpdateLigneEBDto } from './dto/update-ligne-eb.dto';

@Controller('lignes-eb')
export class LigneEBController {
  constructor(private readonly ligneEBService: LigneEBService) {}

  @Post()
  create(@Body() createLigneEBDto: CreateLigneEBDto) {
    return this.ligneEBService.create(createLigneEBDto);
  }

  @Get()
  findAll(@Query('ebId', ParseIntPipe) ebId?: number) {
    if (ebId) {
      return this.ligneEBService.findByEB(ebId);
    }
    return this.ligneEBService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ligneEBService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateLigneEBDto: UpdateLigneEBDto) {
    return this.ligneEBService.update(id, updateLigneEBDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ligneEBService.remove(id);
  }
}
