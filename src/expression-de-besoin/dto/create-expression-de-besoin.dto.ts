import { IsString, IsEnum, IsOptional, IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export enum StatutEB {
  BROUILLON = 'BROUILLON',
  EN_ATTENTE = 'EN_ATTENTE',
  VALIDE = 'VALIDE',
  REFUSE = 'REFUSE',
  PRIS_EN_CHARGE = 'PRIS_EN_CHARGE',
}

export class CreateLigneDto {
  @IsString()
  description: string;

  @IsInt()
  quantite: number;

  @IsString()
  justification: string;

  @IsInt()
  matiereId: number;
}

export class CreateExpressionDeBesoinDto {
  @IsString()
  titre: string;

  @IsInt()
  divisionId: number;

  @IsInt()
  @IsOptional()
  serviceId?: number;

  @IsEnum(StatutEB)
  @IsOptional()
  statut?: StatutEB;


  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLigneDto)
  @IsOptional()
  lignes?: CreateLigneDto[];
}
