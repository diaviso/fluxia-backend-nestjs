import { IsInt, IsOptional, IsString, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLigneReceptionDto {
  @IsInt()
  ligneBonCommandeId: number;

  @IsInt()
  @Min(0)
  quantiteRecue: number;

  @IsInt()
  @Min(0)
  quantiteConforme: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  quantiteNonConforme?: number;

  @IsOptional()
  @IsString()
  observations?: string;
}

export class CreateReceptionDto {
  @IsInt()
  bonCommandeId: number;

  @IsOptional()
  @IsString()
  livreur?: string;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLigneReceptionDto)
  lignes: CreateLigneReceptionDto[];
}
