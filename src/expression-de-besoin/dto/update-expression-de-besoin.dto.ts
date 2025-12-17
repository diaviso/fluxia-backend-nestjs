import { PartialType } from '@nestjs/mapped-types';
import { CreateExpressionDeBesoinDto } from './create-expression-de-besoin.dto';

export class UpdateExpressionDeBesoinDto extends PartialType(CreateExpressionDeBesoinDto) {}
