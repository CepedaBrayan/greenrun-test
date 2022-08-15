import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'JhonDoe' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  @ApiProperty({ example: '12345678' })
  password: string;
}
