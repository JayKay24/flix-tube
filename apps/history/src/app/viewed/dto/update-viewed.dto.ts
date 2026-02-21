import { PartialType } from '@nestjs/mapped-types';
import { CreateViewedDto } from './create-viewed.dto';

export class UpdateViewedDto extends PartialType(CreateViewedDto) {}
