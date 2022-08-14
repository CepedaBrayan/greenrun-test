import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserClientDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'JohnDoe' })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Doe' })
  last_name: string;

  @IsString()
  @Length(7, 20)
  @ApiProperty({ example: '12345678' })
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'JohnDoe@mail.ex' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'JohnDoe' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  @ApiProperty({ example: '12345678pass' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(7)
  @ApiProperty({ example: '12345678' })
  dni: string;
}
