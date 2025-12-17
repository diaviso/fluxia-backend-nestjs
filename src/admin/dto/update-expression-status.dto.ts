import { IsEnum } from 'class-validator';

export enum StatutEB {
  BROUILLON = 'BROUILLON',
  EN_ATTENTE = 'EN_ATTENTE',
  VALIDE = 'VALIDE',
  REFUSE = 'REFUSE',
  PRIS_EN_CHARGE = 'PRIS_EN_CHARGE',
}

export class UpdateExpressionStatusDto {
  @IsEnum(StatutEB)
  statut: StatutEB;
}
