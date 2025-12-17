import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ExpressionDeBesoinService } from './expression-de-besoin.service';
import { CreateExpressionDeBesoinDto, StatutEB } from './dto/create-expression-de-besoin.dto';
import { UpdateExpressionDeBesoinDto } from './dto/update-expression-de-besoin.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('expressions-de-besoin')
@UseGuards(JwtAuthGuard)
export class ExpressionDeBesoinController {
  constructor(private readonly expressionDeBesoinService: ExpressionDeBesoinService) {}

  @Post()
  create(@Body() createExpressionDeBesoinDto: CreateExpressionDeBesoinDto, @CurrentUser() user: any) {
    return this.expressionDeBesoinService.create(createExpressionDeBesoinDto, user.id);
  }

  @Get()
  findAll(
    @CurrentUser() user: any,
    @Query('statut') statut?: StatutEB,
    @Query('search') search?: string,
  ) {
    if (search) {
      return this.expressionDeBesoinService.search(search, user.id, user.role);
    }
    if (statut) {
      return this.expressionDeBesoinService.findByStatut(statut, user.id, user.role);
    }
    return this.expressionDeBesoinService.findAll(user.id, user.role);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expressionDeBesoinService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExpressionDeBesoinDto: UpdateExpressionDeBesoinDto) {
    return this.expressionDeBesoinService.update(id, updateExpressionDeBesoinDto);
  }

  @Patch(':id/statut')
  updateStatut(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { statut: StatutEB },
  ) {
    return this.expressionDeBesoinService.updateStatut(id, body.statut);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expressionDeBesoinService.remove(id);
  }
}
