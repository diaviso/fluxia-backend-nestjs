import { IsString, IsOptional, IsEmail, IsBoolean } from 'class-validator';

export class CreateFournisseurDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsString()
  raisonSociale: string;

  @IsOptional()
  @IsString()
  adresse?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  ice?: string;

  @IsOptional()
  @IsString()
  rc?: string;

  @IsOptional()
  @IsBoolean()
  actif?: boolean;
}
