import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserAdminDto {
  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ example: '123456' })
  auth_code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'JohnDoeAdmin' })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'DoeAdmin' })
  last_name: string;

  @IsString()
  @Length(7, 20)
  @ApiProperty({ example: '12345678' })
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'JohnDoeAdmin@mail.ex' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'JohnDoeAdmin' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  @ApiProperty({ example: '12345678pass' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(7)
  @ApiProperty({ example: '987654321' })
  dni: string;
}
