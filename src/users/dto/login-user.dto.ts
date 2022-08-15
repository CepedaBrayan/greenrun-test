import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'JohnDoeAdmin' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  @ApiProperty({ example: '12345678' })
  password: string;
}
