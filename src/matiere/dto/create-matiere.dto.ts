import { IsString, IsEnum, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateMatiereDto {
  @IsString()
  code: string;

  @IsString()
  designation: string;

  @IsEnum(['CONSOMMABLE', 'DURABLE'])
  type: string;

  @IsEnum(['INFORMATIQUE', 'MOBILIER', 'FOURNITURE', 'VEHICULE', 'EQUIPEMENT', 'MATERIEL_MEDICAL', 'PRODUIT_ENTRETIEN', 'PAPETERIE', 'AUTRE'])
  categorie: string;

  @IsEnum(['PIECE', 'LOT', 'BOITE', 'PAQUET', 'KG', 'GRAMME', 'LITRE', 'MILLILITRE', 'METRE', 'METRE_CARRE', 'CARTON', 'PALETTE'])
  unite: string;

  @IsOptional()
  @IsNumber()
  valeurUnitaire?: number;

  @IsOptional()
  @IsNumber()
  seuilAlerte?: number;

  @IsOptional()
  @IsBoolean()
  actif?: boolean;
}
