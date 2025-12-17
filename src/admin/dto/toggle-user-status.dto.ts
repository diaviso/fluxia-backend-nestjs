import { IsBoolean } from 'class-validator';

export class ToggleUserStatusDto {
  @IsBoolean()
  actif: boolean;
}
