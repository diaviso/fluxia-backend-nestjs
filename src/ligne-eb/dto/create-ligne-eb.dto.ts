import { IsString, IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateLigneEBDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @Min(1)
  quantite: number;

  @IsString()
  @IsNotEmpty()
  justification: string;

  @IsInt()
  matiereId: number;

  @IsInt()
  ebId: number;
}
