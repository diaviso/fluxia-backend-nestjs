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
import { FournisseurService } from './fournisseur.service';
import { CreateFournisseurDto } from './dto/create-fournisseur.dto';
import { UpdateFournisseurDto } from './dto/update-fournisseur.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('fournisseurs')
@UseGuards(JwtAuthGuard)
export class FournisseurController {
  constructor(private readonly fournisseurService: FournisseurService) {}

  @Post()
  create(@Body() createFournisseurDto: CreateFournisseurDto) {
    return this.fournisseurService.create(createFournisseurDto);
  }

  @Get()
  findAll(@Query('includeInactive') includeInactive?: string) {
    return this.fournisseurService.findAll(includeInactive === 'true');
  }

  @Get('search')
  search(@Query('term') term: string) {
    return this.fournisseurService.search(term || '');
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fournisseurService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFournisseurDto: UpdateFournisseurDto,
  ) {
    return this.fournisseurService.update(id, updateFournisseurDto);
  }

  @Patch(':id/toggle-status')
  toggleStatus(@Param('id', ParseIntPipe) id: number) {
    return this.fournisseurService.toggleStatus(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fournisseurService.remove(id);
  }
}
