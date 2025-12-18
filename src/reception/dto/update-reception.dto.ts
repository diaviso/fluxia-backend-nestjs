import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateReceptionDto } from './create-reception.dto';

export class UpdateReceptionDto extends PartialType(
  OmitType(CreateReceptionDto, ['bonCommandeId', 'lignes'] as const),
) {}
