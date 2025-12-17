import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { BonCommandeService } from './bon-commande.service';
import { CreateBonCommandeDto } from './dto/create-bon-commande.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('bon-commande')
@UseGuards(JwtAuthGuard)
export class BonCommandeController {
  constructor(private readonly bonCommandeService: BonCommandeService) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createBonCommandeDto: CreateBonCommandeDto) {
    return this.bonCommandeService.create(createBonCommandeDto);
  }

  @Get()
  findAll() {
    return this.bonCommandeService.findAll();
  }

  @Get('expression/:expressionId')
  findByExpression(@Param('expressionId', ParseIntPipe) expressionId: number) {
    return this.bonCommandeService.findByExpression(expressionId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bonCommandeService.findOne(id);
  }

  @Post(':id/regenerate')
  @UseGuards(AdminGuard)
  regenerate(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<CreateBonCommandeDto>) {
    return this.bonCommandeService.regenerate(id, updateData);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBonCommandeDto: Partial<CreateBonCommandeDto>) {
    return this.bonCommandeService.update(id, updateBonCommandeDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bonCommandeService.delete(id);
  }
}
