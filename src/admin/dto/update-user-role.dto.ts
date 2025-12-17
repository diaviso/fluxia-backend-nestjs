import { IsEnum } from 'class-validator';

export class UpdateUserRoleDto {
  @IsEnum(['AGENT', 'VALIDATEUR', 'ADMIN'], {
    message: 'Le rôle doit être AGENT, VALIDATEUR ou ADMIN',
  })
  role: 'AGENT' | 'VALIDATEUR' | 'ADMIN';
}
