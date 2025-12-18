import { IsNotEmpty, IsNumber, IsString, IsOptional, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class LigneBonCommandeDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantite: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  prixUnitaire: number;

  @IsNotEmpty()
  @IsString()
  matiereCode: string;

  @IsNotEmpty()
  @IsString()
  matiereNom: string;

  @IsNotEmpty()
  @IsString()
  unite: string;
}

export class CreateBonCommandeDto {
  @IsNotEmpty()
  @IsNumber()
  expressionId: number;

  @IsOptional()
  @IsNumber()
  fournisseurId?: number;

  @IsOptional()
  @IsString()
  adresseLivraison?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  tauxTVA?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  remise?: number;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LigneBonCommandeDto)
  lignes: LigneBonCommandeDto[];
}
