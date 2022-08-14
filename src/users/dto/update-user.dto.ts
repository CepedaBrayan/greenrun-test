import { PartialType } from '@nestjs/swagger';
import { CreateUserClientDto } from './create-user-client.dto';

export class UpdateUserDto extends PartialType(CreateUserClientDto) {}
