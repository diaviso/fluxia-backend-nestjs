import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsInt()
  @IsNotEmpty()
  divisionId: number;
}
