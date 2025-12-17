import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateDiscussionDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsInt()
  @IsNotEmpty()
  expressionId: number;
}
