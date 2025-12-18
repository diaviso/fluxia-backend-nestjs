import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ReceptionService } from './reception.service';
import { CreateReceptionDto } from './dto/create-reception.dto';
import { UpdateReceptionDto } from './dto/update-reception.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('receptions')
@UseGuards(JwtAuthGuard)
export class ReceptionController {
  constructor(private readonly receptionService: ReceptionService) {}

  @Post()
  create(@Body() createReceptionDto: CreateReceptionDto) {
    return this.receptionService.create(createReceptionDto);
  }

  @Get()
  findAll(@Query('bonCommandeId') bonCommandeId?: string) {
    return this.receptionService.findAll(
      bonCommandeId ? parseInt(bonCommandeId, 10) : undefined,
    );
  }

  @Get('stats/:bonCommandeId')
  getStats(@Param('bonCommandeId', ParseIntPipe) bonCommandeId: number) {
    return this.receptionService.getReceptionStats(bonCommandeId);
  }

  @Get('bon-commande/:bonCommandeId')
  findByBonCommande(@Param('bonCommandeId', ParseIntPipe) bonCommandeId: number) {
    return this.receptionService.findByBonCommande(bonCommandeId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.receptionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReceptionDto: UpdateReceptionDto,
  ) {
    return this.receptionService.update(id, updateReceptionDto);
  }

  @Patch(':id/pv-generated')
  markPvGenerated(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { pvUrl?: string },
  ) {
    return this.receptionService.markPvGenerated(id, body.pvUrl);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.receptionService.remove(id);
  }
}
