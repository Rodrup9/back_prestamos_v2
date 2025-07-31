import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    status?: boolean;
}
