import { PartialType } from '@nestjs/mapped-types';
import { CreateLigneEBDto } from './create-ligne-eb.dto';

export class UpdateLigneEBDto extends PartialType(CreateLigneEBDto) {}
