import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateDivisionDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsInt()
  @IsOptional()
  directeurId?: number;
}
